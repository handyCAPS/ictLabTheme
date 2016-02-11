<?php

define('THEME_ROOT', get_stylesheet_directory_uri());

function ictlab_styles()
{
    wp_register_style('main', THEME_ROOT . '/css/ictlab/main.css', array(), '0.1');

    wp_register_script('main', THEME_ROOT . '/js/main.js', array(), '0.1', true);

    wp_enqueue_style('main');

    wp_enqueue_script('main');
}

add_action('wp_enqueue_scripts', 'ictlab_styles');


// Register Navigation Menus
function ictlab_custom_navigation_menus()
{

    $locations = array(
        'main_menu' => __( 'Main menu top page', 'ictlab' ),
    );
    register_nav_menus( $locations );

}
add_action( 'init', 'ictlab_custom_navigation_menus' );


// Adding custom classes to top menu
function ictlabTopMenuClasses($classes)
{
    $classes[] = 'nav--item';
    $classes[] = 'nav--item__top';

    return $classes;
}
add_action('nav_menu_css_class','ictlabTopMenuClasses');


function ictlab_frontpage_triplet()
{
    $labels = array(
            'name'                => _x( 'Triplets', 'Triplets', 'ictlab' ),
            'singular_name'       => _x( 'Triplets', 'Triplet', 'ictlab' ),
            'menu_name'           => __( 'Triplets', 'ictlab' ),
            'name_admin_bar'      => __( 'Triplets', 'ictlab' ),
            'parent_item_colon'   => __( 'Parent Item:', 'ictlab' ),
            'all_items'           => __( 'Alle Triplets', 'ictlab' ),
            'add_new_item'        => __( 'Nieuwe Triplet', 'ictlab' ),
            'add_new'             => __( 'Triplet toevoegen', 'ictlab' ),
            'new_item'            => __( 'Nieuwe Triplet', 'ictlab' ),
            'edit_item'           => __( 'Triplet bewerken', 'ictlab' ),
            'update_item'         => __( 'Triplet vernieuwen', 'ictlab' ),
            'view_item'           => __( 'Triplet bekijken', 'ictlab' ),
            'search_items'        => __( 'Zoek Triplet', 'ictlab' ),
            'not_found'           => __( 'Niets gevonden', 'ictlab' ),
            'not_found_in_trash'  => __( 'Niets gevonden in prullenbak', 'ictlab' ),
        );
        $args = array(
            'label'               => __( 'triplet', 'ictlab' ),
            'description'         => __( 'Columns op voorpagina', 'ictlab' ),
            'labels'              => $labels,
            'supports'            => array('title','editor','thumbnail','custom-fields'),
            'taxonomies'          => array( 'category', 'post_tag' ),
            'hierarchical'        => false,
            'public'              => true,
            'show_ui'             => true,
            'show_in_menu'        => true,
            'menu_position'       => 5,
            'show_in_admin_bar'   => true,
            'show_in_nav_menus'   => true,
            'can_export'          => true,
            'has_archive'         => true,
            'exclude_from_search' => false,
            'publicly_queryable'  => true,
            'capability_type'     => 'page',
        );
    register_post_type('frontpage_triplet', $args);
}

add_action('init', 'ictlab_frontpage_triplet');