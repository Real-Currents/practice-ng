using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace practice_angularjs {

    public partial class Practice_Angularjs : System.Web.UI.Page {

        protected void Page_PreInit( object sender,EventArgs e ) {
            Response.Write("Message from ASP.NET: Page_PreInit<br />\n");
        }

        protected void Page_Init( object sender,EventArgs e ) {
            Response.Write("Message from ASP.NET: Page_Init<br />\n");
        }

        protected void Page_Load( object sender,EventArgs e ) {
            Response.Write( "Message from ASP.NET: Page_Load<br />\n" );
        }

        protected void Page_PreRender( object sender,EventArgs e ) {
            Response.Write("Message from ASP.NET: Page_PreRender<br />\n");
        }
    }
}
