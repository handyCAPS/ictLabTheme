

<?php get_header(); ?>

<?php if (is_home()): ?>
        <section class="triple-wrap">

        <?php

        $trips = new WP_Query(array(
            'post_type' => 'frontpage_triplet',
            'meta_key' => 'order',
            'orderby' => 'meta_value',
            'order' => 'ASC'
            ));

        if ($trips->have_posts()) : while ($trips->have_posts()) : $trips->the_post();

        ?>

            <i class="fa fa-<?php echo get_post_meta(get_the_ID(), 'icon', true); ?> triple-icon"></i>
            <div class="triple">

                <h3 class="triple-header"><?php the_title(); ?></h3>

                <p><?php the_content(); ?></p>

                <?php edit_post_link('Bewerken'); ?>

            </div>


        <?php
            endwhile;
            wp_reset_postdata();
            endif;
        ?>

        </section>
<?php endif; if (is_page()): ?>


    <section class="content content-left">
        <article class="panel">
            <h2 class="panel--header">This is a panel</h2>

            <p class="panel--text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis voluptatibus non maiores molestiae officia numquam reprehenderit, vel, culpa animi vero voluptatem suscipit, dolore dolores velit provident cumque! Fugit ut, voluptatibus! Fi fi fl
            </p>
            <p class="panel--text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis voluptatibus non maiores molestiae officia numquam reprehenderit, vel, culpa animi vero voluptatem suscipit, dolore dolores velit provident cumque! Fugit ut, voluptatibus! Fi fi fl
            </p>
        </article>
    </section><!--


     --><section class="content content-right">

        <?php get_sidebar(); ?>

     </section>

    <div class="action-wrap">
        <button type="button" class="btn btn-large btn-action btn-secondary">Action</button>
    </div>


<?php endif; ?>


    </div><!--  end #contentWrap  -->

    </div><!--  end outerWrap  -->


   <!-- bower:js -->
   <!-- endbower -->
<?php get_footer(); ?>