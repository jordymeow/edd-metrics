(function(window, document, $, undefined){

  var eddm = {};

  eddm.init = function() {
    eddm.doCal();
  }

  eddm.doCal = function() {

    var dd = new Calendar({
      element: $('.metrics-datepicker'),
      earliest_date: 'January 1, 2006',
      latest_date: moment(),
      start_date: moment().subtract(29, 'days'),
      end_date: moment(),
      callback: eddm.callback
    });

    // run it with defaults
    dd.calendarSaveDates();

  }

  eddm.callback = function() {

    var start = moment(this.start_date).format('ll'),
        end = moment(this.end_date).format('ll');

    console.debug('Start Date: '+ start +'\nEnd Date: '+ end);

    var data = {
      'action': 'edd_metrics_change_date',
      'start': start,
      'end' : end
    };

    var compareTemp = '% over the last ';

    $.post( window.ajaxurl, data, eddm.postResponse );

  }

  eddm.postResponse = function(response) {

    console.log( response );
    var data = JSON.parse(response);
    console.log( data );

    var compareTemp = '% over the last ' + data.dates.num_days + ' days';

    $('#revenue').text( '$' + data.earnings.total );
    $('#revenue-compare span').text( data.earnings.compare.percentage + compareTemp ).removeClass().addClass( data.earnings.compare.classes );

    $('#sales').text( data.sales.count );
    $('#sales-compare span').text( data.sales.compare.percentage + compareTemp ).removeClass().addClass( data.sales.compare.classes );

    $('#yearly').text( '$' + data.earnings.avgyearly.total );
    $('#avgyearly-compare span').text( data.earnings.avgyearly.compare.percentage + compareTemp ).removeClass().addClass( data.earnings.avgyearly.compare.classes );

    $('#avgpercust').text( '$' + data.earnings.avgpercust.total );
    $('#avgpercust-compare span').text( data.earnings.avgpercust.compare.percentage + compareTemp ).removeClass().addClass( data.earnings.avgpercust.compare.classes );

    $('#renewals').text( data.renewals.count );

    $('#refunds').text( data.refunds.count );
    
  }

  jQuery(document).ready( eddm.init );

})(window, document, jQuery);