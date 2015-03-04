<?php

define('THEME_ROOT', get_stylesheet_directory_uri());

function ictlab_styles() {
    wp_register_style('main', THEME_ROOT . '/css/ictlab/main.css', array(), '0.1');

    wp_register_script('main', THEME_ROOT . '/js/main.js', array(), '0.1', true);

    wp_enqueue_style('main');

    wp_enqueue_script('main');
}

add_action('wp_enqueue_scripts', 'ictlab_styles');