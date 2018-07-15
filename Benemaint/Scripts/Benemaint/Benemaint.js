//<![CDATA[

var policyNumber = "";
var claimNumber = "";
var lastname = "";
var firstname = "";
var userID = "";
var pEdit = 0;
var cEdit = 0;
var enableNextPrev = 0;


var m_cprid = "";

var fnam = "";
var lnam = "";
var	mnam= "";
var	bdte= "";
var	zcode= "";
var	snam= "";
var tin = "";

var ssn = "";
var ssnType = "";
var account = "";
var businessArea = "";
var wrkType = "";
var status = "";
var pTotal = 0;
var cTotal = 0;

var tmpRemoved = "";
var tmpAccounts = "";
var tmpBeneficiary = "";
var tmpPrimary = "";
var tmpContingent = "";
var tmpTotals = "";

var tmpRow ="";
var ctrCount = "";
var ctrRadio = "";

var tmpBlank ="{\"data\":\"\"}"

var selected = [];
var baseurl = '';
var environ = window.location.host;
var pathname = window.location.pathname;
var vrError = "";
var callType = "";
var table;
var tablePercentage;
var tableRemoved;

var jSonActionResponse = '';
var blnStatus = false;

$(document).ready(function () {
    if (location.hostname !== "localhost") {
        baseurl = location.protocol + "//" + location.host + pathname.toLowerCase().replace("benemaint/index", "");
    }
    else {
        baseurl = "http://" + environ;
    }
    ssn = getUrlParameter('ssn');
    ssnType = getUrlParameter('ssnType');
    userID = getUrlParameter('userID');
    status = ""; //getUrlParameter('status');
    tmpRemoved = tmpBlank;
    var vTotals = " {\"data\":[ {\"Count\":\"1\",\"Primary\":\"0\",\"Contingent\":\"0\"},{\"Count\":\"2\",\"Primary\":\"0\",\"Contingent\":\"0\"},{\"Count\":\"3\",\"Primary\":\"0\",\"Contingent\":\"0\"},{\"Count\":\"4\",\"Primary\":\"0\",\"Contingent\":\"0\"},{\"Count\":\"5\",\"Primary\":\"0\",\"Contingent\":\"0\"} ]} ";
    tmpTotals = JSON.parse(vTotals);
    ctrCount = 1;
    $('#fldCount').val(ctrCount);
    $('#fldSSN').val(ssn.replace('000', ''));
   
    callType = "LoadSearch";

    $('#resultSearch').show();
    waitingDialog.show();

    fillPercentage();
    getAccountSelected();

    $('#btnSave').click(function () {

        if (tmpBeneficiary != tmpBlank) {
            if (checkRelationship() == 1) {
                addEditBenefits();
                ctrCount = 1;
                $('#fldCount').val(ctrCount);
                moveBenefits();
                getTotals();

                if (pTotal > 100 || cTotal > 100) {
                    alert("You cannot save more than 100% Total Primary or Contingent Beneficiary")
                }
                else {
                    saveBeneInfo();
                }
            }
            else { alert("Releationship is required"); }
        }
    });

    $('#btnRemove').click(function () {

        removeAccount();
        var vTotals = " {\"data\":[ {\"Count\":\"1\",\"Primary\":\"0\",\"Contingent\":\"0\"},{\"Count\":\"2\",\"Primary\":\"0\",\"Contingent\":\"0\"},{\"Count\":\"3\",\"Primary\":\"0\",\"Contingent\":\"0\"},{\"Count\":\"4\",\"Primary\":\"0\",\"Contingent\":\"0\"},{\"Count\":\"5\",\"Primary\":\"0\",\"Contingent\":\"0\"} ]} ";
        tmpTotals = JSON.parse(vTotals);
        
        refreshPercentage();

        pTotal = 0;
        cTotal = 0;

        postTotal();
     
        tmpBeneficiary = tmpBlank;
        tmpContingent = tmpBlank;
        clearPBeneficiary();
        clearCBeneficiary();

        ctrCount = 1;
        $('#fldCount').val(ctrCount);

    });

    $('#btnAdd').click(function () {

        account = "";
        fillPercentage();
        addAccount();
    });

    $('#btnNext').click(function () {
        if (tmpBeneficiary != tmpBlank) {
            if (checkRelationship() == 1) {
                addCount();
                getTotals();
            }
            else { alert("Releationship is required"); }
        }
    });

    $('#btnPrev').click(function () {

        if (tmpBeneficiary != tmpBlank) {
            if (checkRelationship() == 1) {
                lessCount();
                getTotals();
            }
            else { alert("Releationship is required"); }
        }
    });

    $('#btnFirst').click(function () {
        if (tmpBeneficiary != tmpBlank) {
            if (checkRelationship() == 1) {
                addEditBenefits();
                ctrCount = 1;
                $('#fldCount').val(ctrCount);
                moveBenefits();
                getTotals();
            }
            else { alert("Releationship is required"); }
        }
    });

    $('#btnLast').click(function () {
        if (tmpBeneficiary != tmpBlank) {
            if (checkRelationship() == 1) {
                addEditBenefits();
                ctrCount = 5;
                $('#fldCount').val(ctrCount);
                moveBenefits();
                getTotals();
            }
            else { alert("Releationship is required"); }
        }
    });

    $('#btnCancel').click(function () {
        self.close();
    });

});

function mutualFundAccount()
{
    tmpRemoved = "{\"data\":\"\"}";
    var vTotals = " {\"data\":[ {\"Count\":\"1\",\"Primary\":\"0\",\"Contingent\":\"0\"},{\"Count\":\"2\",\"Primary\":\"0\",\"Contingent\":\"0\"},{\"Count\":\"3\",\"Primary\":\"0\",\"Contingent\":\"0\"},{\"Count\":\"4\",\"Primary\":\"0\",\"Contingent\":\"0\"},{\"Count\":\"5\",\"Primary\":\"0\",\"Contingent\":\"0\"} ]} ";
    tmpTotals = JSON.parse(vTotals);
    ctrCount = 1;

    $('#fldCount').val(ctrCount);

    ssn = "";
    ssnType = "";

    ctrRadio = "mutualFundAccount";

    refreshPercentage();
    getAccountSelected();

    pTotal = 0;
    cTotal = 0;
    postTotal();
    tmpBeneficiary = tmpBlank;
    tmpContingent = tmpBlank;
    clearPBeneficiary();
    clearCBeneficiary();



}


function annuityAccounts()
{
    tmpRemoved = tmpBlank;
    var vTotals = " {\"data\":[ {\"Count\":\"1\",\"Primary\":\"0\",\"Contingent\":\"0\"},{\"Count\":\"2\",\"Primary\":\"0\",\"Contingent\":\"0\"},{\"Count\":\"3\",\"Primary\":\"0\",\"Contingent\":\"0\"},{\"Count\":\"4\",\"Primary\":\"0\",\"Contingent\":\"0\"},{\"Count\":\"5\",\"Primary\":\"0\",\"Contingent\":\"0\"} ]} ";
    tmpTotals = JSON.parse(vTotals);
    ctrCount = 1;

    $('#fldCount').val(ctrCount);

    ssn = getUrlParameter('ssn');
    ssnType = getUrlParameter('ssnType');

    ctrRadio = "annuityAccounts";

    refreshPercentage();
    getAccountSelected();

    pTotal = 0;
    cTotal = 0;

    postTotal();

    tmpBeneficiary = tmpBlank;
    tmpContingent = tmpBlank;
    clearPBeneficiary();
    clearCBeneficiary();
}
function specifiedAccounts()
{
    tmpRemoved = tmpBlank;
    var vTotals = " {\"data\":[ {\"Count\":\"1\",\"Primary\":\"0\",\"Contingent\":\"0\"},{\"Count\":\"2\",\"Primary\":\"0\",\"Contingent\":\"0\"},{\"Count\":\"3\",\"Primary\":\"0\",\"Contingent\":\"0\"},{\"Count\":\"4\",\"Primary\":\"0\",\"Contingent\":\"0\"},{\"Count\":\"5\",\"Primary\":\"0\",\"Contingent\":\"0\"} ]} ";
    tmpTotals = JSON.parse(vTotals);
    ctrCount = 1;

    $('#fldCount').val(ctrCount);
    ssn = getUrlParameter('ssn');
    ssnType = getUrlParameter('ssnType');
    ctrRadio = "specifiedAccounts";

    refreshPercentage();
    getAccountSelected();

    pTotal = 0;
    cTotal = 0;

    postTotal();

    tmpBeneficiary = tmpBlank;
    tmpContingent = tmpBlank;
    clearPBeneficiary();
    clearCBeneficiary();

}


function checkRelationship()
{
    var cRelationship = $('#fldCRelationship').val();
    var pRelationship = $('#fldPRelationship').val();
    var rtn = 0;
    if (checkCBeneRow() != 0) {
        if (cRelationship != null) {
            rtn = 1;
        }
        else { return 0; }
    }
    else { rtn = 1; }

    if (checkPBeneRow() != 0) {
        if (pRelationship != null) {
            rtn = 1;
        }
        else { return 0; }
    }
    else { rtn = 1; }

    return rtn;

}

    function getTotals()
    {
        pTotal = 0;
        cTotal = 0;
        for (var i = 0, len = 5; i < len; ++i) {


            if (tmpBeneficiary.data.length > i) {

                if (tmpBeneficiary.data[i].BENEFICIARY_PERCENT == "")
                {
                    tmpTotals.data[i].Primary = "0";
                } else
                {
                    tmpTotals.data[i].Primary = tmpBeneficiary.data[i].BENEFICIARY_PERCENT;
                }
                pTotal = parseInt(pTotal) + parseInt(tmpTotals.data[i].Primary);
            }

            if (tmpContingent.data.length > i) {
                if (tmpContingent.data[i].BENEFICIARY_PERCENT == "") {
                    tmpTotals.data[i].Contingent = "0";
                }
                else {
                    tmpTotals.data[i].Contingent = tmpContingent.data[i].BENEFICIARY_PERCENT;
                }

                cTotal = parseInt(cTotal) + parseInt(tmpTotals.data[i].Contingent);
            }


        }

        refreshPercentage();
        postTotal();


    }

    function addCount()
    {
        addEditBenefits();
        if (ctrCount < 5)
        {
            ctrCount = ctrCount + 1;
            $('#fldCount').val(ctrCount);
            moveBenefits();
        }
    
    }

    function lessCount() {

        addEditBenefits();
        if (ctrCount > 1) {
            ctrCount = ctrCount - 1;
            $('#fldCount').val(ctrCount);
            moveBenefits();
        }
    
    }

    function addEditBenefits()
    {
        if (pEdit == 1 ) {
            updatePBenefit(tmpBeneficiary, ctrCount - 1);
        }
        else {
            if (checkPBeneRow() > 0) {
                tmpBeneficiary.data.push(JSON.parse(setPBeneRow()));
            }
        }

        if (cEdit == 1) {
            updateCBenefit(tmpContingent, ctrCount - 1);
        }
        else {
            if (checkCBeneRow() > 0) {
                tmpContingent.data.push(JSON.parse(setCBeneRow()));
            }
        }


    }

    function moveBenefits()
    {
        if (enableNextPrev > 0)
        {

            if (tmpBeneficiary.data.length >= ctrCount) {
                fillPBeneficiary(tmpBeneficiary.data[ctrCount - 1]);
                pEdit = 1;
            }
            else {
                clearPBeneficiary();
                pEdit = 0;
            }

            if (tmpContingent.data.length >= ctrCount) {
                fillCBeneficiary(tmpContingent.data[ctrCount - 1]);
                cEdit = 1;
            }
            else {
                clearCBeneficiary();
                cEdit = 0;
        
            }
        }

    }

    function fillAccountsRemoved()
    {

        if (location.hostname !== "localhost") {
            baseurl = location.protocol + "//" + location.host + pathname.toLowerCase().replace("benemaint/index", "");
        }
        else {

            baseurl = "http://" + environ;
        }

        tableRemoved = $('#dataPolicy').DataTable({
            "responsive": true,
            "scrollY": '20vh',
            "scrollX": false,
            "select": true,
            "retrieve": true,
            "bLengthChange": false,
            "ajax": {
                "url": baseurl + "/benemaint/returnData",
                "type": "GET",
                "data": function (policyData) {
                    policyData.tmpRemoved = tmpRemoved;
                },
                "error": function (xhr, text, err) {
                    thrown = err;
                    $('.messageBody').html("<ul>" + thrown + "</ul>")
                    $('#dialogIndex').modal();
                },
                "complete": function (xhr, text) {
                    // Use `complete` rather than `success` so that all status codes are
                    // caught and can return valid JSON (useful when working with REST
                    // services).

                    var json = xhr.status === 204 ? {} : xhr.responseJSON;
                    if ($.isPlainObject(json)) {
                        tableRemoved.responsive.recalc();
                        setTimeout(function () { waitingDialog.hide(); }, 2000);
                    }
                    else {
                        waitingDialog.hide();
                        if (xhr.responseText.indexOf("COUNT") >= 0) {
                            $(".modal-title").empty();
                            $('.messageBody').html('<ul style="color: red">Search Error: More than 100 Records Found. <br/>Please Add More Fields Or Make Search More Specific.</ul>')
                            $('#dialogIndex').modal();
                            tableRemoved.clear().draw();
                        }
                        else if (xhr.responseText.indexOf("NODATA") >= 0) {
                            $(".modal-title").empty();
                            $('.messageBody').html('<ul style="color: red">No Results Found.</ul>');
                            $('#dialogIndex').modal();
                            tableRemoved.clear().draw();
                        }

                    }
                },
            },
            "columns": [
                { "title": "Account", "data": "PTP_ACT_IDT" },
                { "title": "Product", "data": "PRODUCT" },
                { "title": "GrpNo", "data": "GROUP_NUM" },
                { "title": "Plan", "data": "PLAN_NUM" },
                { "title": "Sub", "data": "SUBGROUP_NUM" },
                { "title": "SSN Type", "data": "PTP_IDT_TYP_COD" },
                { "title": "Account Code", "data": "PTP_ACT_STA_COD" },
                { "title": "Participant Name", "data": "PARTICIPANT_NAME" }

            ]
        });
    }

    function fillAccountSelected() {

        waitingDialog.show();
        if (location.hostname !== "localhost") {
            baseurl = location.protocol + "//" + location.host + pathname.toLowerCase().replace("benemaint/index", "");
        }
        else {

            baseurl = "http://" + environ;
        }

        table = $('#dataPolicy2').DataTable({
            "responsive": true,
            "scrollY": '20vh',
            "scrollX": false,
            "select": true,
            "retrieve": true,
            "bLengthChange": false,
            "ajax": {
                "url": baseurl + "/benemaint/returnAccounts",
                "type": "GET",
                "data": function (policyData) {
                    if (callType == "search") {
                        policyData.tmpAccounts = tmpAccounts;
                    }
                    else {
                        policyData.tmpAccounts = tmpAccounts;
                    }
                },
                "error": function (xhr, text, err) {
                    thrown = err;
                    $('.messageBody').html("<ul>" + thrown + "</ul>")
                    $('#dialogIndex').modal();
                },
                "complete": function (xhr, text) {
                    // Use `complete` rather than `success` so that all status codes are
                    // caught and can return valid JSON (useful when working with REST
                    // services).
                    //tmpRow = xhr.responseText;
                    var json = xhr.status === 204 ? {} : xhr.responseJSON;
                    if ($.isPlainObject(json)) {                   
                        table.responsive.recalc();
                        setTimeout(function () { waitingDialog.hide(); }, 2000);

                        $('#dataPolicy2 tbody').on('click', 'tr', function () {

                            var data = table.row(this).data();
                            if (data != undefined) {
                                account = data.PTP_ACT_IDT;

                                getBeneficiary();
                                waitingDialog.hide();
                                //tablePercentage.ajax.reload();
                                //tablePercentage.responsive.recalc();

                                //alert(data.PTP_ACT_IDT);
                            }
                        });
                    
                    }
                    else {
                        waitingDialog.hide();
                        if (xhr.responseText.indexOf("COUNT") >= 0) {
                            $(".modal-title").empty();
                            $('.messageBody').html('<ul style="color: red">Search Error: More than 100 Records Found. <br/>Please Add More Fields Or Make Search More Specific.</ul>')
                            $('#dialogIndex').modal();
                            table.clear().draw();
                        }
                        else if (xhr.responseText.indexOf("NODATA") >= 0) {
                            $(".modal-title").empty();
                            $('.messageBody').html('<ul style="color: red">No Results Found.</ul>');
                            $('#dialogIndex').modal();
                            table.clear().draw();
                        }

                    }
                },
            },
            "columns": [
                { "title": "Account", "data": "PTP_ACT_IDT" },
                { "title": "Product", "data": "PRODUCT" },
                { "title": "GrpNo", "data": "GROUP_NUM" },
                { "title": "Plan", "data": "PLAN_NUM" },
                { "title": "Sub", "data": "SUBGROUP_NUM" },
                { "title": "SSN Type", "data": "PTP_IDT_TYP_COD" },
                { "title": "Account Code", "data": "PTP_ACT_STA_COD" },
                { "title": "Participant Name", "data": "PARTICIPANT_NAME" }

            ]
        });
        //fillPercentage();

    }

    function refreshPercentage()
    {

        tablePercentage.ajax.reload();
        tablePercentage.responsive.recalc();
    }

    function rPercentages()
    {
        fillPercentage();
    }

    function fillPercentage() {


        if (location.hostname !== "localhost") {
            baseurl = location.protocol + "//" + location.host + pathname.toLowerCase().replace("benemaint/index", "");
        }
        else {

            baseurl = "http://" + environ;
        }

        tablePercentage = $('#dataPolicy3').DataTable({
            "responsive": false,
            "scrollY": '30vh',
            "scrollX": false,
            "select": true,
            "retrieve": true,
            "bLengthChange": false,
            "ajax": {
                "url": baseurl + "/benemaint/returnTotals",
                "type": "GET",
                "data": function (policyData) {
                    if (callType == "search") {
                        policyData.tmpTotals = JSON.stringify(tmpTotals);
                    }
                    else {
                        policyData.tmpTotals = JSON.stringify(tmpTotals);
                    }
                },
                "error": function (xhr, text, err) {
                    thrown = err;
                    //$('.messageBody').html("<ul>" + thrown + "</ul>")
                    //$('#dialogIndex').modal();
                },
                "complete": function (xhr, text) {
                    // Use `complete` rather than `success` so that all status codes are
                    // caught and can return valid JSON (useful when working with REST
                    // services).
                    var json = xhr.status === 204 ? {} : xhr.responseJSON;
                    if ($.isPlainObject(json)) {
                        tablePercentage.responsive.recalc();
                        setTimeout(function () { waitingDialog.hide(); }, 2000);
                    }
                    else {
                        waitingDialog.hide();

                        if (xhr.statusText == "abort") {
                            rPercentages();
                        }
                        else {
                            if (xhr.responseText.indexOf("COUNT") >= 0) {
                                $(".modal-title").empty();
                                $('.messageBody').html('<ul style="color: red">Search Error: More than 100 Records Found. <br/>Please Add More Fields Or Make Search More Specific.</ul>')
                                $('#dialogIndex').modal();
                                tablePercentage.clear().draw();
                            }
                            else if (xhr.responseText.indexOf("NODATA") >= 0) {
                                $(".modal-title").empty();
                                $('.messageBody').html('<ul style="color: red">No Results Found.</ul>');
                                $('#dialogIndex').modal();
                                tablePercentage.clear().draw();
                            }
                        }

                    }
                },
            },
            "columns": [
                { "title": "Sort", "data": "Count" },
                { "title": "Primary", "data": "Primary" },
                { "title": "Contingent", "data": "Contingent" }
            ]
        });
    }

    function hideStatusMessage() {
        $('#info').empty();
        $('#info').hide();
        $('#warning').empty();
        $('#warning').hide();
        $('#error').empty();
        $('#error').hide();
    }

    function saveBeneInfo()
    {

        if (location.hostname !== "localhost") {
            baseurl = location.protocol + "//" + location.host + pathname.toLowerCase().replace("benemaint/index", "");
        }
        else {

            baseurl = "http://" + environ;
        }

        var vPBene = JSON.stringify(tmpBeneficiary);
        var vCBene = JSON.stringify(tmpContingent); 
   
        $.ajax({
            url: baseurl + '/Benemaint/InsertBeneInfo',
            data: {

                //pBeneficiary: vPBene,
                //cBeneficiary: vCBene,
                ssn: ssn,
                acctNo: account,
                pBene: vPBene,
                cBene: vCBene
            },
            type: 'POST',
            error: function (jqXHR, textStatus, errorThrown) {
                //$('#info').html('<p>An error has occurred</p>');
            },
            success: function (data) {

                alert("Save Complete");

            }
        });





    }

    function getAccountSelected()
    {
        if (location.hostname !== "localhost") {
            baseurl = location.protocol + "//" + location.host + pathname.toLowerCase().replace("benemaint/index", "");
        }
        else {

            baseurl = "http://" + environ;
        }


        $.ajax({
            url: baseurl + '/benemaint/GetInfo',
            data: {
                ssn: ssn,
                ssnType: ssnType
            },
            type: 'GET',
            error: function () {
                //$('#info').html('<p>An error has occurred</p>');
            },
            success: function (data) {

                //tmpRow = xhr.responseText;
            
                var jsonAccount = JSON.parse(data);
            
                switch(ctrRadio)
                {
                    case "specifiedAccounts":
                        tmpAccounts = data;
                        table.ajax.reload();
                        table.responsive.recalc();

                        tableRemoved.ajax.reload();
                        tableRemoved.responsive.recalc();
                        break;
                    case "annuityAccounts":
                        tmpAccounts = data;
                        table.ajax.reload();
                        table.responsive.recalc();

                        tableRemoved.ajax.reload();
                        tableRemoved.responsive.recalc();

                        break;
                    case "mutualFundAccount":
                        tmpAccounts = data;
                        table.ajax.reload();
                        table.responsive.recalc();

                        tableRemoved.ajax.reload();
                        tableRemoved.responsive.recalc();

                        break;
                    default:
                        $('#fldName').val(jsonAccount.data[0].PARTICIPANT_NAME);
                        tmpAccounts = data;
                        fillAccountSelected();
                        fillAccountsRemoved();
                }
                
            
                //$('#fldName').val(json.data[0].PARTICIPANT_NAME);
                //account = json.data[0].PTP_ACT_IDT;

            }
        });



    }

    function getBeneficiary() {
        if (location.hostname !== "localhost") {
            baseurl = location.protocol + "//" + location.host + pathname.toLowerCase().replace("benemaint/index", "");
        }
        else {

            baseurl = "http://" + environ;
        }


        $.ajax({
            url: baseurl + '/benemaint/GetBeneInfo',
            data: {
                ssn: ssn,
                ssnType: ssnType,
                acctNo: account
            },
            type: 'GET',
            error: function () {
                //$('#info').html('<p>An error has occurred</p>');
            },
            success: function (data) {

                //tmpRow = xhr.responseText;
                var vTotals = " {\"data\":[ {\"Count\":\"1\",\"Primary\":\"0\",\"Contingent\":\"0\"},{\"Count\":\"2\",\"Primary\":\"0\",\"Contingent\":\"0\"},{\"Count\":\"3\",\"Primary\":\"0\",\"Contingent\":\"0\"},{\"Count\":\"4\",\"Primary\":\"0\",\"Contingent\":\"0\"},{\"Count\":\"5\",\"Primary\":\"0\",\"Contingent\":\"0\"} ]} ";
                tmpTotals = JSON.parse(vTotals);


                var jsonAccount = JSON.parse(data);
            
                var vBeneFormat = " {\"data\":[]} ";

                tmpBeneficiary = JSON.parse(vBeneFormat);
                tmpContingent = JSON.parse(vBeneFormat);

                for (var i = 0, len = jsonAccount.data.length; i < len; ++i)
                {
                    if (jsonAccount.data[i].BENEFICIARY_TYPE == "PRIMARY") {
                        tmpBeneficiary.data.push(jsonAccount.data[i]);
                    }
                    else {
                        tmpContingent.data.push(jsonAccount.data[i]);
                    }
                }
                
                if (tmpBeneficiary.data.length > 0) {
                    fillPBeneficiary(tmpBeneficiary.data[0]);
                    pEdit = 1;
                }

                if (tmpContingent.data.length > 0) {
                    fillCBeneficiary(tmpContingent.data[0]);
                    cEdit = 1;
                }
                ctrCount = 1;
                $('#fldCount').val(ctrCount);
                enableNextPrev = 1;

                pTotal = 0;
                cTotal = 0;
            
                getTotals();

            }
        });



    }

    function postTotal()
    {
        var notationS = document.getElementById("spTotal");
        notationS.innerText = notationS.textContent = "           Total         " + pTotal + "                        " + cTotal;

    }

    function updatePBenefit(jsonObj,id) {
     
        jsonObj.data[id].BENE_FULL_NAME = $('#fldPName').val();
        jsonObj.data[id].BENE_SSN_NUM = $('#fldPSSN').val();
        jsonObj.data[id].BENE_ADDRESS_1 = $('#fldPAddress1').val();
        jsonObj.data[id].BENE_ADDRESS_2 = $('#fldPAddress2').val();
        jsonObj.data[id].BENE_DATE_OF_BIRTH = $('#fldPDOB').val();
        jsonObj.data[id].RELATIONSHIP_TO_PARTICIPANT = $('#fldPRelationship').val();
        jsonObj.data[id].BENE_CITY = $('#fldPCity').val();
        jsonObj.data[id].BENE_STATE = $('#fldPState').val();
        jsonObj.data[id].BENE_ZIP_CODE = $('#fldPZip').val();
        jsonObj.data[id].BENE_FOREIGN_ZIP_CODE = $('#fldPForeignZip').val();
        jsonObj.data[id].BENEFICIARY_PERCENT = $('#fldPPercentage').val();
    }
    function updateCBenefit(jsonObj, id) {

        jsonObj.data[id].BENE_FULL_NAME = $('#fldCName').val();
        jsonObj.data[id].BENE_SSN_NUM = $('#fldCSSN').val();
        jsonObj.data[id].BENE_ADDRESS_1 = $('#fldCAddress1').val();
        jsonObj.data[id].BENE_ADDRESS_2 = $('#fldCAddress2').val();
        jsonObj.data[id].BENE_DATE_OF_BIRTH = $('#fldCDOB').val();
        jsonObj.data[id].RELATIONSHIP_TO_PARTICIPANT = $('#fldCRelationship').val();
        jsonObj.data[id].BENE_CITY = $('#fldCCity').val();
        jsonObj.data[id].BENE_STATE = $('#fldCState').val();
        jsonObj.data[id].BENE_ZIP_CODE = $('#fldCZip').val();
        jsonObj.data[id].BENE_FOREIGN_ZIP_CODE = $('#fldCForeignZip').val();
        jsonObj.data[id].BENEFICIARY_PERCENT = $('#fldCPercentage').val();

    }

    function fillCBeneficiary(Beneficiary) {
        $('#fldCName').val(Beneficiary.BENE_FULL_NAME);
        $('#fldCSSN').val(Beneficiary.BENE_SSN_NUM);
        $('#fldCAddress1').val(Beneficiary.BENE_ADDRESS_1);
        $('#fldCAddress2').val(Beneficiary.BENE_ADDRESS_2);
        $('#fldCDOB').val(Beneficiary.BENE_DATE_OF_BIRTH);
        $('#fldCRelationship').val(Beneficiary.RELATIONSHIP_TO_PARTICIPANT);
        $('#fldCCity').val(Beneficiary.BENE_CITY);
        $('#fldCState').val(Beneficiary.BENE_STATE);
        $('#fldCZip').val(Beneficiary.BENE_ZIP_CODE);
        $('#fldCForeignZip').val(Beneficiary.BENE_FOREIGN_ZIP_CODE);
        $('#fldCPercentage').val(Beneficiary.BENEFICIARY_PERCENT);
    }

    function fillPBeneficiary(Beneficiary)
    {
        $('#fldPName').val(Beneficiary.BENE_FULL_NAME);
        $('#fldPSSN').val(Beneficiary.BENE_SSN_NUM);
        $('#fldPAddress1').val(Beneficiary.BENE_ADDRESS_1);
        $('#fldPAddress2').val(Beneficiary.BENE_ADDRESS_2);
        $('#fldPDOB').val(Beneficiary.BENE_DATE_OF_BIRTH);
        $('#fldPRelationship').val(Beneficiary.RELATIONSHIP_TO_PARTICIPANT);
        $('#fldPCity').val(Beneficiary.BENE_CITY);
        $('#fldPState').val(Beneficiary.BENE_STATE);
        $('#fldPZip').val(Beneficiary.BENE_ZIP_CODE);
        $('#fldPForeignZip').val(Beneficiary.BENE_FOREIGN_ZIP_CODE);
        $('#fldPPercentage').val(Beneficiary.BENEFICIARY_PERCENT);
    }

    function clearCBeneficiary()
    {
        $('#fldCName').val('');
        $('#fldCSSN').val('');
        $('#fldCAddress1').val('');
        $('#fldCAddress2').val('');
        $('#fldCDOB').val('');
        $('#fldCRelationship').val('');
        $('#fldCCity').val('');
        $('#fldCState').val('');
        $('#fldCZip').val('');
        $('#fldCForeignZip').val('');
        $('#fldCPercentage').val('');
    }

    function clearPBeneficiary() {

        $('#fldPName').val('');
        $('#fldPSSN').val('');
        $('#fldPAddress1').val('');
        $('#fldPAddress2').val('');
        $('#fldPDOB').val('');
        $('#fldPRelationship').val('');
        $('#fldPCity').val('');
        $('#fldPState').val('');
        $('#fldPZip').val('');
        $('#fldPForeignZip').val('');
        $('#fldPPercentage').val('');
    }

    function checkPBeneRow()
    {
        var PName = $('#fldPName').val();
        var PSSN = $('#fldPSSN').val();
        var PAddress1 = $('#fldPAddress1').val();
        var PAddress2 = $('#fldPAddress2').val();
        var PDOB = $('#fldPDOB').val();
        var PRelationship = $('#fldPRelationship').val();
        var PCity = $('#fldPCity').val();
        var PState = $('#fldPState').val();
        var PZip = $('#fldPZip').val();
        var PForeignZip = $('#fldPForeignZip').val();
        var PPercentage = $('#fldPPercentage').val();

        var lReturn = PName.length + PSSN.length + PAddress1.length + PAddress2.length + PDOB.length + PCity.length + PState.length + PZip.length + PForeignZip.length + PPercentage.length;

        return lReturn;

    }

    function checkCBeneRow() {
        var cName = $('#fldCName').val();
        var cSSN = $('#fldCSSN').val();
        var cAddress1 = $('#fldCAddress1').val();
        var cAddress2 = $('#fldCAddress2').val();
        var cDOB = $('#fldCDOB').val();
        var cRelationship = $('#fldCRelationship').val();
        var cCity = $('#fldCCity').val();
        var cState = $('#fldCState').val();
        var cZip = $('#fldCZip').val();
        var cForeignZip = $('#fldCForeignZip').val();
        var cPercentage = $('#fldCPercentage').val();

        var cReturn = cName.length + cSSN.length + cAddress1.length + cAddress2.length + cDOB.length + cCity.length + cState.length + cZip.length + cForeignZip.length + cPercentage.length;

        return cReturn;

    }

    function setPBeneRow()
    {
        var PName = $('#fldPName').val();
        var PSSN = $('#fldPSSN').val();
        var PAddress1 = $('#fldPAddress1').val();
        var PAddress2 = $('#fldPAddress2').val();
        var PDOB = $('#fldPDOB').val();
        var PRelationship = $('#fldPRelationship').val();
        var PCity = $('#fldPCity').val();
        var PState = $('#fldPState').val();
        var PZip = $('#fldPZip').val();
        var PForeignZip = $('#fldPForeignZip').val();
        var PPercentage = $('#fldPPercentage').val();

        var sDate = moment().format('YYYY-MM-DD') ;
        var sTime = moment().format('hh.mm.ss.SSSSSS');
        var PCRDA = sDate + "-" + sTime;
        var pBeneRow = "{\"PTP_IDT\":\"" + ssn + "\",\"PTP_IDT_TYP_COD\":\"" + ssnType + "\",\"ACCT_NUM\":\"" + account + "\",\"AWD_CRDA_BENE_DATE\":\"" + PCRDA + "\",\"BENEFICIARY_TYPE\":\"PRIMARY\",\"BENE_SSN_NUM\":\"" + PSSN + "\",\"BENE_FULL_NAME\":\"" + PName + "\",\"BENE_DATE_OF_BIRTH\":\"" + PDOB + "\",\"RELATIONSHIP_TO_PARTICIPANT\":\"" + PRelationship + "\",\"BENEFICIARY_PERCENT\":\"" + PPercentage + "\",\"ADDITIONAL_BENE_FLAG\":\"N\",\"LAST_MAINT_USER\":\""+userID+"\",\"BENE_ADDRESS_1\":\"" + PAddress1 + "\",\"BENE_ADDRESS_2\":\"" + PAddress2 + "\",\"BENE_CITY\":\"" + PCity + "\",\"BENE_STATE\":\"" + PState + "\",\"BENE_ZIP_CODE\":\"" + PZip + "\",\"BENE_FOREIGN_ZIP_CODE\":\"" + PForeignZip + "\",\"ACTIVE_BENE_FLAG\":\"Y\"}"

        return pBeneRow;
    }

    function setCBeneRow() {
        var cName = $('#fldCName').val();
        var cSSN = $('#fldCSSN').val();
        var cAddress1 = $('#fldCAddress1').val();
        var cAddress2 = $('#fldCAddress2').val();
        var cDOB = $('#fldCDOB').val();
        var cRelationship = $('#fldCRelationship').val();
        var cCity = $('#fldCCity').val();
        var cState = $('#fldCState').val();
        var cZip = $('#fldCZip').val();
        var cForeignZip = $('#fldCForeignZip').val();
        var cPercentage = $('#fldCPercentage').val();

        var sDate = moment().format('YYYY-MM-DD');
        var sTime = moment().format('hh.mm.ss.SSSSSS');
        var cCRDA = sDate + "-" + sTime;
        var cBeneRow = "{\"PTP_IDT\":\"" + ssn + "\",\"PTP_IDT_TYP_COD\":\"" + ssnType + "\",\"ACCT_NUM\":\"" + account + "\",\"AWD_CRDA_BENE_DATE\":\"" + cCRDA + "\",\"BENEFICIARY_TYPE\":\"CONTINGENT\",\"BENE_SSN_NUM\":\"" + cSSN + "\",\"BENE_FULL_NAME\":\"" + cName + "\",\"BENE_DATE_OF_BIRTH\":\"" + cDOB + "\",\"RELATIONSHIP_TO_PARTICIPANT\":\"" + cRelationship + "\",\"BENEFICIARY_PERCENT\":\"" + cPercentage + "\",\"ADDITIONAL_BENE_FLAG\":\"N\",\"LAST_MAINT_USER\":\"" + userID + "\",\"BENE_ADDRESS_1\":\"" + cAddress1 + "\",\"BENE_ADDRESS_2\":\"" + cAddress2 + "\",\"BENE_CITY\":\"" + cCity + "\",\"BENE_STATE\":\"" + cState + "\",\"BENE_ZIP_CODE\":\"" + cZip + "\",\"BENE_FOREIGN_ZIP_CODE\":\"" + cForeignZip + "\",\"ACTIVE_BENE_FLAG\":\"Y\"}"

        return cBeneRow;
    }


    function removeAccount()
    {
        //$('tr:has(td:contains("No data available in table"))').hide();
        try {
        var acctNo = "";

        var rows = $('tr.selected');
        var rowData = table.rows(rows).data();

        var dataStr = JSON.stringify($("#awdLOBFields").html());
        var raw_data = dataStr.substring(dataStr.lastIndexOf("\":\"") + 3, dataStr.lastIndexOf("\"}"));
        var replaced = '[{' + raw_data.split('\\').join('') + '" }]';
        var lobFields = JSON.parse(replaced);
        var jSonResponse = '';
        jSonResponse += '{';
      
            $.each($(rowData), function (key, value) {
                for (var i = 0, len = lobFields.length; i < len; ++i) {
                    var awdLOBfld = lobFields[i];
                    jSonResponse += '\"' + awdLOBfld.Text + '\":\"' + value[awdLOBfld.Text] + '\",';
                    if (awdLOBfld.Text == "PTP_ACT_IDT")
                    {
                        acctNo = value[awdLOBfld.Text];
                    }
                }

                jSonResponse += 'XXX';
                jSonResponse =  jSonResponse.replace(',XXX', '}');
            });

            if (acctNo != "") {
                var newJ = $.parseJSON(tmpAccounts.replace(',{]}', ']}'));;

                jQuery(newJ.data).each(function (index) {
                    if (newJ.data[index].PTP_ACT_IDT == acctNo) {
                        newJ.data.splice(index, 1); // This will remove the object that first name equals to Test1
                        return false; // This will stop the execution of jQuery each loop.
                    }
                });
                tmpAccounts = JSON.stringify(newJ);
                table.ajax.reload();
                table.responsive.recalc();

                if (tmpRemoved == "{\"data\":\"\"}" || tmpRemoved == "{\"data\":[]}") {
                    tmpRemoved = "{\"data\":[" + jSonResponse + "]}"
                }

                else {
                    var ss = "," + jSonResponse + "]}";
                    tmpRemoved = tmpRemoved.replace("]}", ss);
                }
                tableRemoved.ajax.reload();
                tableRemoved.responsive.recalc();
            }
        }
        catch (err)
        {
          
        }
    }

    function addAccount()
    {
    
        //$('tr:has(td:contains("No data available in table"))').hide();
        try {
        var acctNo = "";

        var rows = $('tr.selected');
        var rowData = tableRemoved.rows(rows).data();

        var dataStr = JSON.stringify($("#awdLOBFields").html());
        var raw_data = dataStr.substring(dataStr.lastIndexOf("\":\"") + 3, dataStr.lastIndexOf("\"}"));
        var replaced = '[{' + raw_data.split('\\').join('') + '" }]';
        var lobFields = JSON.parse(replaced);
        var jSonResponse = '';
        jSonResponse += '{';
        
            $.each($(rowData), function (key, value) {
                for (var i = 0, len = lobFields.length; i < len; ++i) {
                    var awdLOBfld = lobFields[i];
                    jSonResponse += '\"' + awdLOBfld.Text + '\":\"' + value[awdLOBfld.Text] + '\",';
                    if (awdLOBfld.Text == "PTP_ACT_IDT") {
                        acctNo = value[awdLOBfld.Text];
                    }
                }

                jSonResponse += 'XXX';
                jSonResponse = jSonResponse.replace(',XXX', '}');
            });

            if (acctNo != "") {

                var newJ = $.parseJSON(tmpRemoved.replace(',{]}', ']}'));;

                jQuery(newJ.data).each(function (index) {
                    if (newJ.data[index].PTP_ACT_IDT == acctNo) {
                        newJ.data.splice(index, 1); // This will remove the object that first name equals to Test1
                        return false; // This will stop the execution of jQuery each loop.
                    }
                });
                tmpRemoved = JSON.stringify(newJ);
                tableRemoved.ajax.reload();
                tableRemoved.responsive.recalc();


                if (tmpAccounts == "{\"data\":\"\"}") {
                    tmpAccounts = "{\"data\":[" + jSonResponse + "]}";
                }
                else if (tmpAccounts == "{\"data\":[]}") {
                    tmpAccounts = "{\"data\":[" + jSonResponse + "]}";
                }
                else {
                    var ss = "," + jSonResponse + "]}";
                    tmpAccounts = tmpAccounts.replace("]}", ss);
                }
                table.ajax.reload();
                table.responsive.recalc();
            }
        }
        catch (err)
        {
        }

    }
    //$("#btnReset").click(function () {
    //    $('#fldSSN').val('');
    //    $('#fldAccountNo').val('');
    //    //$('#fldBusinessArea').val('');
    //    //$('#fldWorkType').val('');
    //    //$('#fldStatus').val('');
    //    hideStatusMessage();
    //    table.clear().draw();
    //    //$('#fldLastName').removeAttr('style');
    //    //$('#fldFirstName').removeAttr('style');
    //});

    function getJSonResponse(awdLOBfld, awdLOBfldValue) {
        var jSonResponse = "";
        if (awdLOBfld.value != "") {
            jSonResponse = '"FieldName":"' + awdLOBfld.Value + '","FieldValue":"' + awdLOBfldValue + '",';
        }
        else {
            jSonResponse = '"FieldName":"' + awdLOBfld.Text + '","FieldValue":"' + awdLOBfldValue + '",';
        }
        return jSonResponse;

    }


    var getUrlParameter = function getUrlParameter(sParam) {

        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
        try {
            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
        }
        catch (err) {
            alert(err.message);
        }
    };

    function isEmptyOrSpaces(str) {
        return str === null || str.match(/^ *$/) !== null;
    }

    function returnBack(dataResponse) {
        var myMessage = new Array();
        myMessage.push(dataResponse); // Input control having the OBJECT ID 

        if (document.referrer != null)
            parent.postMessage(myMessage, document.referrer);

    }

    $("#fldtin").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            // Allow: Ctrl+A, Command+A
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    $("#fldFirstName").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            // Allow: Ctrl+A, Command+A
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        //if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        //    e.preventDefault();
        //}
    });

    function alphanumericonly(o) {
        o.value = o.value.toUpperCase().replace(/([^0-9A-Z])/g, "");
    }

    $("#fldFirstName").bind('keyup', function (e) {
        $("#fldFirstName").val(($("#fldFirstName").val()).toUpperCase());
    });

    $("#fldLastName").bind('keyup', function (e) {
        $("#fldLastName").val(($("#fldLastName").val()).toUpperCase());
    });

    //]]>