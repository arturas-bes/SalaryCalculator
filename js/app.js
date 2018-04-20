//3 tabs menu selection
const settings = $('.settings');
const paymentAfterTax = $('.calc-in-hand');
const paymentBeforeTax = $('.calc-before-tax');
//buttons menu select
const settingsButton = $('#settings');
const afterTaxButton = $('#inHand');
const beforeTaxButton = $('#onPaper');
// Form input object
function myInputObject() {
    var inputFields = {
        incomeTax: $('input[name="incomeTax"]').val(),
        healthInsurance: $('input[name="insurance"]').val(),
        retirementFund: $('input[name="retirement"]').val(),
        employerTax: $('input[name="employerTax"]').val(),
        authorContract: $('input[name="authorContract"]').val(),
        salaryOnPaper: $('input[name="salaryOnPaper"]').val(),
        authorContractIncome: $('input[name="authorIncome"]').val(),
        salaryInHand: $('input[name="salaryInHand"]').val()
    };
    return inputFields
}

// Form output object
function myOutputObject() {
    var output = {
        incomeTax: 0,
        healthInsurance: 0,
        retirementFund: 0,
        employerTaxes: 0,
        employeePrice: 0,
        authorContractTax: 0,
        authorContractIncome: 0,
        incomeInHand: 0,
        incomeOnPaper: 0,
        totalncomeOnPaper: 0

    };
    return output
}
//Function to calculate salary in hands
function calculateSalaryInHand() {
    //init my object
    var myInputs = myInputObject();
    var myOutputs = myOutputObject();
    if (myInputs.incomeTax < 0 || myInputs.healthInsurance < 0 || myInputs.retirementFund < 0 || myInputs.employerTax < 0 || myInputs.authorContract < 0 || myInputs.salaryOnPaper < 0 || myInputs.authorContractIncome < 0 || myInputs.salaryInHand < 0) {
        myInputs.incomeTax = 0;
        myInputs.healthInsurance = 0;
        myInputs.retirementFund = 0;
        myInputs.employerTax = 0;
        myInputs.authorContract = 0;
        myInputs.salaryOnPaper = 0;
        myInputs.authorContractIncome = 0;
        myInputs.salaryInHand = 0;
    }
    //employee tax
    myOutputs.incomeTax = myInputs.incomeTax / 100 * myInputs.salaryOnPaper; // callculate income tax % to (currency)
    myOutputs.healthInsurance = myInputs.healthInsurance / 100 * myInputs.salaryOnPaper; // calculate health insurance % to (currency)
    myOutputs.retirementFund = myInputs.retirementFund / 100 * myInputs.salaryOnPaper; // calculate retirement fund and tax % to (currency)
    //income in hand
    myOutputs.incomeInHand = myInputs.salaryOnPaper - myOutputs.incomeTax - myOutputs.healthInsurance - myOutputs.retirementFund; //calculate slary in hand (currency)
    // author contracts
    myOutputs.authorContractTax = myInputs.authorContract / 100 * myInputs.salaryOnPaper; //money made from author contracts
    //employer tax
    myOutputs.employerTaxes = myInputs.employerTax / 100 * myInputs.salaryOnPaper; // calculate emplyrer tax % to (currency)
    myOutputs.employeePrice = Number(myInputs.salaryOnPaper) + Number(myOutputs.employerTaxes); // employee price (currency) *Number() used to debug string*
    // create elemnts to output
    var output = `<table>
    <tr>
        <td>Sodros mokesčiai</td>
        <td>${myInputs.retirementFund}%</td>
        <td>${myOutputs.retirementFund.toFixed(2)} EUR</td>
    </tr>
    <tr>
        <td>Sveikatos draudimas</td>
        <td>${myInputs.healthInsurance}%</td>
        <td>${myOutputs.healthInsurance.toFixed(2)} EUR</td>
    </tr>
    <tr>
        <td>Darbdavio mokesčiai</td>
        <td></td>
        <td>${myOutputs.employerTaxes.toFixed(2)} EUR</td>

    </tr>
    <tr>
        <td>Darbo vietos kaina</td>
        <td></td>
        <td>${myOutputs.employeePrice.toFixed(2)} EUR</td>
    
    </tr>
    <tr class="income">
        <td>Jūsų pajamos į rankas</td>
        <td></td>
        <td>${myOutputs.incomeInHand.toFixed(2)} EUR</td>
    
    </tr>
</table>`;
    $('.inHandResults').html(output);
    $('#authorIncText').text(`${myOutputs.authorContractTax.toFixed(2)} EUR`);
}



/************************************************************************************************************************************************************************** */

//Function to calculate salary on paper
function calculateSalaryOnPaper() {
    //init my object
    var myInputs = myInputObject();
    var myOutputs = myOutputObject();
    
    if (myInputs.incomeTax < 0 || myInputs.healthInsurance < 0 || myInputs.retirementFund < 0 || myInputs.employerTax < 0 || myInputs.authorContract < 0 || myInputs.salaryOnPaper < 0 || myInputs.authorContractIncome < 0 || myInputs.salaryInHand < 0) {
        myInputs.incomeTax = 0;
        myInputs.healthInsurance = 0;
        myInputs.retirementFund = 0;
        myInputs.employerTax = 0;
        myInputs.authorContract = 0;
        myInputs.salaryOnPaper = 0;
        myInputs.authorContractIncome = 0;
        myInputs.salaryInHand = 0;
    }
    //employee tax
    myOutputs.incomeTax = myInputs.incomeTax / 100 * myInputs.salaryInHand; // callculate income tax % to (currency)
    myOutputs.healthInsurance = (myInputs.healthInsurance / 100 * myInputs.salaryInHand); // calculate health insurance % to (currency)
    myOutputs.retirementFund = myInputs.retirementFund / 100 * myInputs.salaryInHand; // calculate retirement fund and tax % to (currency)
    // author contracts
    myOutputs.authorContractTax = myInputs.authorContract / 100 * myInputs.authorContractIncome; // calculate author contract % to (currency)
    myOutputs.authorContractIncome = myInputs.authorContractIncome - myOutputs.authorContractTax; //calculate income from author contract  (currency)  
    //income on paper
    myOutputs.incomeOnPaper = Number(myInputs.salaryInHand) + Number(myOutputs.incomeTax) + Number(myOutputs.healthInsurance) + Number(myOutputs.retirementFund); //calculate slary in hand (currency)
    myOutputs.totalncomeOnPaper = Number(myOutputs.incomeOnPaper) + Number(myOutputs.authorContractIncome);


    // create elemnts to output
    var outputOnPaper = `<table>
    <tr class="income">
        <td >Alga ant popieriaus</td>
        <td></td>
        <td>${myOutputs.totalncomeOnPaper.toFixed(2)} EUR</td>
    </tr>
    <tr>
        <td>Pajamu mokestis</td>
        <td>${myInputs.incomeTax}%</td>
        <td>${myOutputs.incomeTax.toFixed(2)} EUR</td>
    </tr>
    <tr>
        <td>Sodros mokesčiai</td>
        <td>${myInputs.retirementFund}%</td>
        <td>${myOutputs.retirementFund.toFixed(2)} EUR</td>

    </tr>
    <tr>
        <td>Sveikatos draudimas</td>
        <td>${myInputs.healthInsurance}%</td>
        <td>${myOutputs.healthInsurance.toFixed(2)} EUR</td>

    </tr>
</table>`;


    $('.resultsOnPaper').html(outputOnPaper);

    $('#authorsTaxesSum').text(`${myOutputs.authorContractTax.toFixed(2)} EUR`);
    $('#authorsTaxesPrecent').text(`${myInputs.authorContract}%`);
    $('#authorsIncSum').text(`${myOutputs.authorContractIncome.toFixed(2)} EUR`);
}


//Click event to execute calulations on paper

/************************************************************************************************************************************************************************** */
// Function to go trough menu items
function elemntSwitch() {
    // click event
    $(settingsButton).click(function () {
        $(settings).removeClass('hidden').addClass('show');
        $(paymentAfterTax).addClass('hidden').removeClass('show');
        $(paymentBeforeTax).addClass('hidden').removeClass('show');
    });
    $(afterTaxButton).click(function () {
        $(settings).addClass('hidden').removeClass('show');
        $(paymentAfterTax).removeClass('hidden').addClass('show');
        $(paymentBeforeTax).addClass('hidden').removeClass('show');
    });
    $(beforeTaxButton).click(function () {
        $(settings).addClass('hidden').removeClass('show');
        $(paymentAfterTax).addClass('hidden').removeClass('show');
        $(paymentBeforeTax).removeClass('hidden').addClass('show');
    });
    // validate author checkbox 
    $('#showAuthorIncome').change(function () {
        if (this.checked) {
            $('.authorContrTax').fadeIn();
        } else {
            $('.authorContrTax').fadeOut();
        }
    });
    // validate author checkbox input
    $('#checkAuthorContrInput').change(function () {
        if (this.checked) {
            $('.hideAuthorContr').fadeIn();
        } else {
            $('.hideAuthorContr').fadeOut();
        }
    });
}
/************************************************************************************************************************************************************************** */
$('.onPaper').click(function () {
    calculateSalaryOnPaper();
});



//Click event to execute calulations
$('.inHand').click(function () {
    calculateSalaryInHand();
});


elemntSwitch();