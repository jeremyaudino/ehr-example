/*jslint sloppy: true, nomen: true */
/*global define: false */
define([
    'jquery',
    'underscore',
    'backbone',
    'models/patient',
    'text!templates/patients/add.html'
], function ($, _, Backbone, Patient, template) {

    return Backbone.View.extend({
        events: {
            'click .create': 'create'
        },

        template: _.template(template),

        initialize: function (options) {
            this.el = options.el;
            this.patientsCollection = options.patientsCollection;

            this.elem = $(this.template({ patientsCollection: this.patientsCollection }));
            this.render();
        },

        create: function (event) {
            // Add patient
            var patient = new Patient({
                first_name: this.$('input[name="patient[first_name]"]').val(),
                last_name: this.$('input[name="patient[last_name]"]').val(),
                date_of_birth: this.$('input[name="patient[date_of_birth]"]').val(),
                state: this.$('select[name="patient[state]"]').val()
            });

            this.patientsCollection.add(patient);

            patient.save();

            window.app.navigate('patients', { trigger: true });
        },
    });

});
