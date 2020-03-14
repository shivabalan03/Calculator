$("#tblCalculator").ready(function(){
    var clearDisplayValue = false
    // Basic();
    calculatorType('basic');
    $("#btnEqualTo").click(function(){
        var inputMethod = $("#ddConvertionType").val();
        var inputFromMethod = $("#ddFromData").val();
        var inputToMethod = $("#ddToData").val();
        var inputFrom = parseFloat($("#txtFromValue").val());
        var inputTo = parseFloat($("#txtToValue").val());
        var result = ''
        if (inputFrom != null || inputFrom != ''){
            result = lengthMathObjects[inputMethod][inputFromMethod][inputToMethod]
            result = eval(inputFrom + result);
            $("#txtToValue").val(result);
        }
    });

    $('#btnEnter, #btnSqrt, #btnLog').click(function(){
        var getValue = $('#txtDisplay').val();
        $('#txtDisplay').val('NaN');
        var result = eval(getValue);
        if (this.id == "btnEnter"){
            $('#txtDisplay').val(result);
        } else if (this.id == "btnSqrt") {
            result = result * result;
            $('#txtDisplay').val(result);
        } else if (this.id == "btnLog") {
            result = Math.log(result);
            $('#txtDisplay').val(result);
        }

    });

    $('#tblCalculator').keypress(function(e){
        if (e.keyCode == 13){
            $("#btnEnter").click();
        }
    });

    var currentFocus = '#txtDisplay'
    $('#txtFromValue, #txtToValue, #txtDisplay').focus(function() {
        currentFocus = '#' + this.id
    });

    $('.advNumbers, .backSpace').click(function(){
        if (this.className == "btn btn-default advNumbers") {
            var previousValue = $(currentFocus).val();
            $(currentFocus).val((previousValue + this.outerText.trim()));
        }
    });

    $('#txtFromValue, #txtToValue').change(function(){
        var fromMethod = $('#ddFromData').val();
        var toMethod = $('#ddToData').val();
    });

    $(".Numbers, .Operators, .MathOperation, #btnBackSpace, #btnClear").on("click", function(){
        var className = ((this.className).replace("btn btn-default ", ""));
        if (className == "Numbers" || className == "Operators" || className == "MathOperation"){
            if (clearDisplayValue) {
                display('');
                clearDisplayValue = false;
            }
        }

        switch(className){
            case    "Numbers":  // contains all number values
                    display($("#txtDisplay").val() + this.outerText);
                    break;

            case    "Operators":    // covers all basic operators
                    display($("#txtDisplay").val() + this.outerText);
                    break;

            case    "MathOperation":    // mathOperations like cos, sin, tan
                    var typeMathop = this.outerText
                    display(Math[typeMathop.toLowerCase().trim()]($("#txtDisplay").val()))
                    clearDisplayValue = true
                    break;

            case    "backSpace": // backspace button event
                    var valDisplayed = $(currentFocus).val();
                    $(currentFocus).val(valDisplayed.slice(0, -1));
                    break;

            case    "clear": // clear the display
                    display('');
                    break;
        }
    });


    $("body").on("change", "#calcType, #ddConvertionType", function(){
        switch(this.id){
            case    "calcType":
                    display('');
                    if ($("#calcType").val() == "Advanced"){
                        calculatorType('advanced');
                    } else {
                        calculatorType('basic');
                    }
                    break;
            case    "ddConvertionType":
                    display('');
                    var conversionType = $(this).find("option:selected").attr("name");
                    if (conversionType == "ddElectrical"){
                        var objElements = {}
                        // $('#lblErrorLog').text('Enter any two known values');
                        $("#tblCalculator tr:eq(9)").hide();
                        $("#tblCalculator tr:eq(10)").show();
                                objElements.Volts = $('#txtVolts').val()
                                objElements.Power = $('#txtPower').val()
                                objElements.Amphere = $('#txtAmphere').val()
                                objElements.Resistance = $('#txtResistence').val()
                                if (objElements.Power != "nil" && objElements.Power != '' && objElements.Volts != 'nil' || objElements.Volts != ''){

                                }
                    } else {
                        $('#lblErrorLog').text('');
                        $("#tblCalculator tr:eq(10)").hide();
                        $("#tblCalculator tr:eq(9)").show();
                        var str = ""
                        if (lengthAttributes[conversionType] != null){
                            for(var i=0; i<lengthAttributes[conversionType].length; i++){
                                str = str + "<option name='"+ lengthAttributes[conversionType][i] +"'>"+ lengthAttributes[conversionType][i] +"</option>"
                            }
                            $("#ddFromData, #ddToData").html(str);
                        }
                    }
        }

    });

    function display(val){
        $("#txtDisplay").val(val);
        $('#txtFromValue').val(val);
        $('#txtToValue').val(val);
    }

    $("#btnSqrt").on("click", function(){
        var valDisplayed = $("#txtDisplay").val();
    });

    function calculatorType(type){
        if (type == "basic") {
            $("#txtDisplay").removeAttr('disabled', 'disabled');
            for (var i=7; i<=10; i++) {
                $("#tblCalculator tr:eq(" + i + ")").hide();
            }
            for (var i=2; i<=6; i++) {
                $("#tblCalculator tr:eq(" + i + ")").show();
            }
            $("#txtDisplay").focus()
        } else if (type == "advanced") {
            $("#txtDisplay").attr('disabled', 'disabled');
            for (var i=7; i<=10; i++) {
                $("#tblCalculator tr:eq(" + i + ")").show();
            }
            for (var i=2; i<=6; i++) {
                $("#tblCalculator tr:eq(" + i + ")").hide();
            }
            $("#txtFromValue").focus();
            $('#lblErrorLog').text('');
            $("#tblCalculator tr:eq(10)").hide();
        }
    }

    function errorLog(){
        $('#lblErrorLog').val('Not a valid data');
    }
});
