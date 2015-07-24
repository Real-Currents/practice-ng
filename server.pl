#!/usr/bin/perl
no warnings;
use Mojolicious::Lite;
use Mojo::JSON 'false';

our $version = Mojolicious->VERSION;

# Add current working directory as path to static files
push @{app->static->paths}, ($ENV{PWD});

get('/' => sub {
  	my $c = shift;
	$c->reply->static('index.html');
});

get('/process' => sub {
	my $c = shift;
	my $msg = "Form Recieved";
	my $data = {};
	my $errors = {};
	
	unless( ($data->{'Name'}) = $c->param('uname') =~ /([\.|\w|\-|\_|\s]+)/ ) {
	 	 $errors->{'name'} = "Name is required.\n";
		 $data->{'Name'} = "!";
	}
	
	unless( ($data->{'Email'}) = $c->param('umail') =~ /([\.|\w|\-|\_|\s]+\@[\.|\w|\-|\_|\s]+)/ ) {
		$errors->{'mail'} = "Email is required.\n";
		$data->{'Email'} = "!";
	}
	
	foreach my $item ( keys %$data ) {
		$msg .= "<br /><br />\n ". $item .": ". $data->{$item};
	}
	
	foreach my $error ( keys %$errors ) {
		$msg .= "<br /><br />\n Error: ". $errors->{$error};
	}
	
	unless( keys %$errors ) {
		$data->{'success'} = 'true';
		$data->{'message'} = $msg;
	} else {
		$data->{'success'} = false;
		$data->{'errors'} = $errors;
		$data->{'message'} = $msg;		
	}	
	
	$c->render(json => $data);
#	
#	$c->render(inline => <<HTML);
#<html><head>
#	<title>Process Angular Form</title>
#</head>
#<body>
#	<p>$msg</p>
#	
#</body></html>
#HTML

});

app->start;
