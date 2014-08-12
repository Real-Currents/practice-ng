<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Practice-AngularJS.aspx.cs" Inherits="practice_angularjs.Practice_Angularjs" %><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Practice AngularJS</title>
    <meta http-equiv="Content-type" content="text/html;charset=UTF-8" />

    <link rel="stylesheet" href="jquery/ui/themes/smoothness/jquery-ui.css" />
    <link rel="stylesheet" href="styles/practice.css" />

    <script type="text/javascript" src="jquery/jquery.min.js"></script>
    <script type="text/javascript" src="jquery/jquery.mobile.min.js"></script>
    <script type="text/javascript" src="angularjs/angular.min.js"></script>
</head>
<body data-role="page" 
      data-ng-app="practice-angularjs"
      data-ng-init="name='Mundo'">

    <form id="form1" runat="server">

        <h1 data-ng-controller="HelloController">{{greet(name)}}</h1>
        <div data-ng-controller='typeBoxController' style="max-width:240px;">
            <h2 data-role="header" style="text-overflow:ellipsis; overflow:hidden; ">{{greeting}} "{{usrmsg}}"</h2>
            You: <div class="practice-user-message"></div>
            <p>
                <span data-ng-show="remaining()">Keep Typing</span><span data-ng-show="(! remaining() )">Stop Typing</span> (
                <span data-ng-class="{'warning': warning()}">remaining chars: {{remaining()}}</span>
                )
            </p>    
        </div>
        <p>Based on an MVC tutorial from the <a href="http://techblog.appnexus.com/2014/angularjs-blog-series-mvc-in-angularjs/" target="_blank">AppNexus Tech Blog</a></p>
	    <div data-ng-controller="selectSubscribersController">
		    <select data-ng-model="model.selected"
				    data-ng-options="user.name for user in model.users">
			    <option value="">Select A User</option>
		    </select>
		    <h3>Subscribers</h3>
		    <ul>
			    <li data-ng-repeat="subscriber in subscribers = ( model.users | filter:{isSubscriber:true} )"
				    style="text-align:left; list-style:none; background-color:#CCF; border-bottom:2px solid #FFF;">
				    <a href="mailto:{{subscriber.email}}">{{subscriber.name}}</a>
				    <a href=""><span class="warning"
					      data-ng-click="removeSubscriber(subscriber)"
					      style="float:right; text-align:right">
				    REMOVE
				    </span></a>
			    </li>
		    </ul>
	    </div>
    </form>
    <p>This app queries the <a href="http://msftdbprodsamples.codeplex.com/releases/view/93587">AdventureWorks</a> database on SQL Server. 
    The local server is accessed with Windows Authentication using the current user's credentials. 'scripts/GetUserList.sql' contains the required stored procedure.
    Please configure the server and database accordingly or alter the selectData() method in Practice-AngularJS to reflect a different configuration.</p>
    <asp:Literal ID="Lit1" runat="server"></asp:Literal>

    <script type="text/javascript" src="scripts/debugger.js"></script>
    <script type="text/javascript" src="scripts/practice.js"></script>
</body></html>
