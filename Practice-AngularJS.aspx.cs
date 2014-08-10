using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace practice_angularjs {

    public partial class Practice_Angularjs : System.Web.UI.Page {

        static string callBack( HttpContext c ) {
            return "Message from ASP.NET: "+ c.CurrentHandler.ToString();
        }

        protected void Page_PreInit( object sender,EventArgs e ) {
            //Response.Write("Message from ASP.NET: Page_PreInit<br />\n");
            //Response.WriteSubstitution(new HttpResponseSubstitutionCallback(callBack));
        }

        protected void Page_Init( object sender,EventArgs e ) {
            //Response.Write("Message from ASP.NET: Page_Init<br />\n");
            Lit1.Text = "";
        }

        protected void Page_Load( object sender,EventArgs e ) {
            //Response.Write( "Message from ASP.NET: Page_Load<br />\n" );
        }

        protected void Page_PreRender( object sender,EventArgs e ) {
			//Response.Write("Message from ASP.NET: Page_PreRender<br />\n");
			Lit1.Text = Lit1.Text + "\n" +
				"	<em>" + DateTime.Now.ToLongTimeString() + " - " +
				callBack(Context) + "</em><br />";
			selectData(Lit1,
				/* The following query is a stored procedure saved in 'GetUserList.sql':
				 * SELECT TOP (@NumberOfUsers) p.FirstName, p.LastName, e.EmailAddress
				 * FROM Person.EmailAddress e INNER JOIN Person.Person p
				 * ON e.BusinessEntityID = p.BusinessEntityID
				 * ORDER BY p.LastName;
				 */
				"EXEC GetUserList @NumberOfUsers = 20;"
			);
        }

		private void selectData( Literal lit, string selectCommandText ) {
			SqlDataAdapter dataAdapter;
			DataTable personData;
			string personList;

			try {
				/* Change the connection string to match with your system. */
				string selectConnection = @"Data Source=LIVE-PORTABLE\SQLEXPRESS;" +
										@"Initial Catalog=AdventureWorks;" +
										@"Integrated Security=True;"; //+
										//@"Connect Timeout=30;" +
										//@"User Instance=True;";
				
				dataAdapter = new SqlDataAdapter(selectCommandText,selectConnection);
				personData = new DataTable();
				dataAdapter.Fill(personData);

				for( int r = 0; r < personData.Rows.Count; r++ ) {
					personList = "	<span id=" + '"';
					for ( int f = 0, z = (personData.Rows[r].ItemArray.Length - 1);
						f < z;
						f++
					) {
						personList = personList + personData.Rows[r].ItemArray[f];
						if ( f < (z - 1) ) personList = personList + '-';
						else personList = personList + r + '"' + ">";
					}
					for( int f = 0, z = personData.Rows[r].ItemArray.Length; 
						f < z; 
						f++ 
					){
						if( f == 0 ) personList = personList + personData.Rows[r].ItemArray[f];
						else personList = personList +" "+ personData.Rows[r].ItemArray[f];
					}
					personList = personList + "</span><br />\n";
					lit.Text = lit.Text + "\n" + personList;
				}
			} catch ( Exception e ) {
				lit.Text = lit.Text + "\n" + e.Message;
			}
		}
    }
}
