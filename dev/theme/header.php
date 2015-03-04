<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title><?php
    if (is_home()) {
        echo bloginfo('name');
    } else {
        echo the_title() . ' | ' . bloginfo('name');
    }
     ?></title>
    <meta name="description" content="<?php bloginfo('description'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link href='http://fonts.googleapis.com/css?family=Fira+Sans:400,300|Rokkitt|Gruppo:600,400,300|Slabo|Poly' rel='stylesheet' type='text/css'>

    <link href="//netdna.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">


    <!-- bower:css -->
    <!-- endbower -->

<?php wp_head(); ?>
</head>
<body>

    <div id="outerWrap">

    <header class="header--hero" role="banner">

        <section class="top-bar">

            <nav class="nav nav-horizontal nav-main">
                <ul class="nav--list nav--list__top">
                    <li class="nav--item nav--item__top current"><a href="#">Home</a></li>
                    <li class="nav--item nav--item__top"><a href="#">About</a></li>
                    <li class="nav--item nav--item__top"><a href="#">History</a></li>
                    <li class="nav--item nav--item__top"><a href="#">Blog</a></li>
                    <li class="nav--item nav--item__top"><a href="#">Contact</a></li>
                </ul>
            </nav>

            <div class="search-wrap">
                <form method="POST" action="" class="search--form">
                    <input type="text" class="search search--input"><i class="fa fa-search"></i>
                </form>
            </div>

        </section>

        <div class="logo-wrap">
            <a href="<?php echo home_url(); ?>"><img alt="logo ictlab alphen aan den rijn" src="<?php echo THEME_ROOT; ?>/img/ictlab-logo.png" class="logo"></a>
        </div>

        <div class="icons-wrap">
            <div class="social-icon-wrap">
                <a href="#"><i class="fa fa-facebook social-icon"></i></a>
            </div><!--
             --><div class="social-icon-wrap">
                <a href="#"><i class="fa fa-twitter social-icon"></i></a>
            </div><!--
             --><div class="social-icon-wrap">
                <a href="#"><i class="fa fa-reddit social-icon"></i></a>
            </div>
        </div>

        <div class="headline-wrap">
            <h1 class="tagline">
                ICT-Lab <br>
                Alphen aan den Rijn
            </h1>
        </div>

        <!-- <div class="action-wrap header--action">
            <a href="#"><button type="button" class="btn btn-large btn-action btn-primary btn-blink btn-action__overlay">Contact</button></a>
        </div> -->

    </header>


    <div id="contentWrap">