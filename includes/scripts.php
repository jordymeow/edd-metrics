<?php
/**
 * Scripts
 *
 * @package     EDD\EDD Metrics\Scripts
 * @since       1.0.0
 */


// Exit if accessed directly
if( !defined( 'ABSPATH' ) ) exit;


/**
 * Load admin scripts
 *
 * @since       1.0.0
 * @global      array $edd_settings_page The slug for the EDD settings page
 * @global      string $post_type The type of post that we are editing
 * @return      void
 */
function EDD_Metrics_admin_scripts( $hook ) {

    // Use minified libraries if SCRIPT_DEBUG is turned off
	$suffix = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';

    /**
     * @todo		This block loads styles or scripts explicitly on the
     *				EDD settings page.
     */
    if( $hook == 'download_page_edd_metrics' ) {
        wp_enqueue_script( 'moment-js', EDD_Metrics_URL . 'assets/js/moment.js', array( 'jquery' ) );
        wp_enqueue_script( 'edd-metrics-js', EDD_Metrics_URL . 'assets/js/admin' . $suffix . '.js', array( 'jquery' ), '1.0', true );
        wp_enqueue_style( 'edd-metrics-css', EDD_Metrics_URL . 'assets/css/admin' . $suffix . '.css' );
        wp_enqueue_script( 'baremetrics-calendar', EDD_Metrics_URL . 'assets/js/Calendar.js', array( 'jquery' ), '1.0', true );

        wp_enqueue_style( 'baremetrics-calendar', EDD_Metrics_URL . 'assets/css/calendar.css' );

    }
}
add_action( 'admin_enqueue_scripts', 'EDD_Metrics_admin_scripts', 100 );