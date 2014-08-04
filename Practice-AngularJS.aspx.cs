using System;
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
        }

        protected void Page_Load( object sender,EventArgs e ) {
            //Response.Write( "Message from ASP.NET: Page_Load<br />\n" );
            Lit1.Text = "<em>" +
                DateTime.Now.ToLongTimeString() + " - " + callBack(Context) + "</em>";
        }

        protected void Page_PreRender( object sender,EventArgs e ) {
            //Response.Write("Message from ASP.NET: Page_PreRender<br />\n");
        }
    }
}
