/**
* @NApiVersion  2.x
* @NScriptType  ClientScript
* @NModuleScope SameAccount
*/

define(['N/runtime'],

/**
* @param {runtime} runtime
*/
function(runtime) {

    /**
    * Function to be executed when field is changed.
    * @param {Object} scriptContext
    * @param {Record} scriptContext.currentRecord - Current form record
    * @param {string} scriptContext.sublistId     - Sublist name
    * @param {string} scriptContext.fieldId       - Field name
    * @param {number} scriptContext.lineNum       - Line number. Will be undefined if not a sublist or matrix field
    * @param {number} scriptContext.columnNum     - Line number. Will be undefined if not a matrix field
    * @since 2015.2
    */

    function fieldChanged(scriptContext) {
        var employee = scriptContext.currentRecord;
        
        if (scriptContext.fieldId == 'socialsecuritynumber') {          // Se o campo que está sendo editado é o CPF na sublista Recursos Humanos
            var cpf_rh = employee.getValue('socialsecuritynumber');     // Pega o valor do campo CPF da sublista RH
            employee.setValue('custentity_enl_cnpjcpf', cpf_rh);       // Seta o valor do CPF que está sendo digitado e coloca no de Inf. Fiscais
        }
    }

    /**
    * Validation function to be executed when record is saved.
    * @param   {Object} scriptContext
    * @param   {Record} scriptContext.currentRecord - Current form record
    * @returns {boolean}                              Return true if record is valid
    * @since 2015.2
    */
   
    function saveRecord(scriptContext) {
        var employee       = scriptContext.currentRecord;
        var cpf_rh         = employee.getValue('socialsecuritynumber');     // Pega valor do campo CPF na sublista Recursos Humanos
        var cpf_infofiscal = employee.getValue('custentity_enl_cnpjcpf');   // Pega valor do campo CPF na sublista Informações Fiscais

        if(cpf_infofiscal == '') {
            employee.setValue('custentity_enl_cnpjcpf', cpf_rh);            // Seta o valor do CPF do RH no CPF das Inf. Fiscais
        }

        log.debug('CPF RH: ', cpf_rh);
        log.debug('CPF INFORMAÇÕES FISCAIS: ', cpf_infofiscal);
        return true;
    }

    return {
        fieldChanged: fieldChanged,
        saveRecord: saveRecord
    };
});
