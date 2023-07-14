$(document).ready(function () {
    'use strict';
    let view_Populate;
    let closure_Populate;
    closure_Populate = function () {
        var me = this;
        me.Constants = {
            JsonFileDepartaments: 'ubigeo/departamentos.json',
            JsonFileProvinces: 'ubigeo/provincias.json',
            JsonFileDistricts: 'ubigeo/distritos.json',
        };
        me.Controls = {
        };
        me.Events = {
            ChangeDepartaments: function (e) {
                let tag = $(this);
                let idUbigeo = tag.val();
                let selectProvinces = $('#provinces');
                let selectDistrics = $('#districts');
                me.Functions.PopulateSelect(me.Constants.JsonFileProvinces, selectProvinces, idUbigeo);

                selectDistrics.empty();
            },
            ChangeProvinces: function (e) {
                let tag = $(this);
                let idUbigeo = tag.val();
                let selectDistrics = $('#districts')
                me.Functions.PopulateSelect(me.Constants.JsonFileDistricts, selectDistrics, idUbigeo);
            }
        };
        me.Variables = {
        };
        me.Functions = {
            InitEvents: function () {
                $('body').on('change', '#departaments', me.Events.ChangeDepartaments);
                $('body').on('change', '#provinces', me.Events.ChangeProvinces);
                me.Functions.PopulateSelect(me.Constants.JsonFileDepartaments, $('#departaments'));
            },
            PopulateSelect: function (file, tag, idFilter) {
                $('progress').fadeIn();
                fetch(file)
                    .then(response => response.json())
                    .then(data => {
                        if (idFilter)
                            data = data[idFilter];

                        tag.empty();

                        $.each(data, function (key, value) {
                            tag.append($('<option></option>').attr('value', value.id_ubigeo).text(value.nombre_ubigeo));
                        });
                        $('progress').fadeOut();
                    })
                    .catch(error => {
                        console.error('Error al cargar el archivo JSON:', error);
                        $('progress').fadeOut();
                    });
            }
        };
        me.Init = function () {
            me.Functions.InitEvents();
        };
    };
    view_Populate = new closure_Populate();
    view_Populate.Init();
});