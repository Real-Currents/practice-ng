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
				"SELECT TOP 100 * FROM Person.Person"
			);
        }

		private void selectData( Literal lit, string selectCommandText ) {
			try {
				/* Change the connection string to match with your system. */
				string selectConnection = @"Data Source=LIVE-PORTABLE\SQLEXPRESS;" +
										@"Initial Catalog=AdventureWorks;" +
										@"Integrated Security=True;"; //+
										//@"Connect Timeout=30;" +
										//@"User Instance=True;";
				
				SqlDataAdapter dataAdapter = new SqlDataAdapter(selectCommandText,selectConnection);
				DataTable personData = new DataTable();
				dataAdapter.Fill(personData);

				for( int r = 0; r < personData.Rows.Count; r++ ) {
					lit.Text = lit.Text +"\n"+
						"	<span id="+'"';
					for ( int f = 4;
						f < 7; //personData.Rows[r].ItemArray.Length; 
						f++
					) {
						lit.Text = lit.Text + personData.Rows[r].ItemArray[f];
						if ( f < 6 ) lit.Text = lit.Text + '-';
						else lit.Text = lit.Text + '"' + ">";
					}
					for( int f = 4; 
						f < 7; //personData.Rows[r].ItemArray.Length; 
						f++ 
					){
						lit.Text = lit.Text +" "+ personData.Rows[r].ItemArray[f];
					}
					lit.Text = lit.Text +"</span><br />";
				}
			} catch ( Exception e ) {
				lit.Text = lit.Text + "\n" + e.Message;
			}
		}
    }
}
