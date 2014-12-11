#!/usr/bin/perl
no warnings;
use Mojolicious::Lite;

our $version = Mojolicious->VERSION;

# Add current working directory as path to static files
push @{app->static->paths}, ($ENV{PWD});

get( '/' => sub {
  	my $c = shift;
	$c->reply->static('hello-controller.html');
} );

app->start;
