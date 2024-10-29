/**
 * @description Variables globales
 */



const getRecord = async (Module, EntityId) => {
    let response = await ZOHO.CRM.API.getRecord({
        Entity: Module,  
        RecordID: EntityId
    });
    return response.data[0];
};

const searchRecord = async (Module, Query) => {
    let response = ZOHO.CRM.API.searchRecord({
        Entity: Module,
        Type: "criteria",
        Query: Query});
    return response;
};


const crearCelda = (tipo, contenido) => {
    const celda = document.createElement(tipo);
    celda.textContent = contenido;
    return celda;
};

const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString(); // Retorna la fecha en formato legible (dd/mm/yyyy)
};


const createRecord = async ( Module, data) => {
    return (await ZOHO.CRM.API.insertRecord({ Entity: Module, APIData: data, Trigger: [ "workflow" ] })).data[0]
}



const updateRecord = async ( Module, data) => {
    return await ZOHO.CRM.API.updateRecord({ Entity: Module, APIData: data, Trigger: [ "workflow" ] })
}



const getRelatedRecords = async ( module, id, related_list) => {
    return await ZOHO.CRM.API.getRelatedRecords({ Entity: module, RecordID: id, RelatedList: related_list, page: 1, per_page: 200 });
}



const fncCancelar = async () => {
    ZOHO.CRM.UI.Popup.closeReload();
}



/**
 * @description Creación y llenado de campos
 */

const fill_list = ( api_name, lista) => {
    for (const i of lista) {
        $(`#fld_${ api_name }`).append(`<option value="${i}">${i}</option>`);
    }
}


const set_value = ( api_name, value ) => {
    $(`#fld_${ api_name }`).val(`${ value }`);
}


const input_text = (FieldName, APIName, disable, mandatory = false, value = "") => {
    $("#box").append(`
        <div class="row align-items-center my-3" id="sec_${ APIName }">
            <div class="col-5 d-flex justify-content-end">
                <label for="${ APIName }" class="col-form-label text-end">${ FieldName }${ mandatory == true ? "<span class=\"text-danger\"> *</span>" : "" }</label>
            </div>
            <div class="col-7">
                <div class="input-group">
                    <input type="text" class="form-control" id="fld_${ APIName }" ${ disable == true ? "disabled" : "" }>
                </div>
            </div>
        </div>
    `);

    set_value(APIName, value)
}


const input_list = (FieldName, APIName, disable, mandatory = false, lista, value = "") => {
    $("#box").append(`
        <div class="row align-items-center my-3" id="sec_${ APIName }">
            <div class="col-5 d-flex justify-content-end">
                <label for="${ APIName }" class="col-form-label text-end"">${ FieldName }${ mandatory == true ? "<span class=\"text-danger\"> *</span>" : "" }</label>
            </div>
            <div class="col-7">
                <select class="form-select" id="fld_${ APIName }" ${ disable == true ? "disabled" : "" }>
                </select>
            </div>
        </div>
    `);

    fill_list(APIName, lista)
    set_value(APIName, value)
}


const input_email = (FieldName, APIName, disable, mandatory = false, value = "") => {
    $("#box").append(`
        <div class="row align-items-center my-3" id="sec_${ APIName }">
            <div class="col-5 d-flex justify-content-end">
                <label for="${ APIName }" class="col-form-label text-end"">${ FieldName }${ mandatory == true ? "<span class=\"text-danger\"> *</span>" : "" }</label>
            </div>
            <div class="col-7">
                <div class="input-group">
                    <input type="email" class="form-control" id="fld_${ APIName }" ${ disable == true ? "disabled" : "" }>
                </div>
            </div>
        </div>
    `);

    set_value(APIName, value)
}


const input_currency = (FieldName, APIName, disable, mandatory = false) => {
    $("#box").append(`
        <div class="row align-items-center my-3" id="sec_${ APIName }">
            <div class="col-5 d-flex justify-content-end">
                <label for="${ APIName }" class="col-form-label text-end"">${ FieldName }${ mandatory == true ? "<span class=\"text-danger\"> *</span>" : "" }</label>
            </div>
            <div class="col-7">
                <div class="input-group">
                    <span class="input-group-text bg-light">$</span>
                    <input type="number" class="form-control" id="fld_${ APIName }" ${ disable == true ? "disabled" : "" }>
                </div>
            </div>
        </div>
    `);
}


const input_check = (FieldName, APIName, disable, mandatory = false, check = true) => {
    $("#box").append(`
        <div class="row align-items-center my-3" id="sec_${ APIName }">
            <div class="col-5 d-flex justify-content-end">
                <label for="${ APIName }" class="col-form-label text-end">${ FieldName }${ mandatory == true ? "<span class=\"text-danger\"> *</span>" : "" }</label>
            </div>
            <div class="col-7">
                <div class="input-group">
                    <input type="checkbox" class="form-check-input" id="fld_${ APIName }" ${ disable == true ? "disabled" : "" } ${ check == true ? "checked" : "" }>
                </div>
            </div>
        </div>
    `);
}


const input_number = (FieldName, APIName, disable, mandatory = false) => {
    $("#box").append(`
        <div class="row align-items-center my-3" id="sec_${ APIName }">
            <div class="col-5 d-flex justify-content-end">
                <label for="${ APIName }" class="col-form-label text-end"">${ FieldName }${ mandatory == true ? "<span class=\"text-danger\"> *</span>" : "" }</label>
            </div>
            <div class="col-7">
                <div class="input-group">
                    <input type="number" class="form-control" id="fld_${ APIName }" ${ disable == true ? "disabled" : "" }>
                </div>
            </div>
        </div>
    `);
}


const input_date = (FieldName, APIName, disable, mandatory = false) => {
    $("#box").append(`
        <div class="row align-items-center my-3" id="sec_${ APIName }">
            <div class="col-5 d-flex justify-content-end">
                <label for="${ APIName }" class="col-form-label text-end">${ FieldName }${ mandatory == true ? "<span class=\"text-danger\"> *</span>" : "" }</label>
            </div>
            <div class="col-7">
                <div class="input-group">
                    <input type="date" class="form-control" id="fld_${ APIName }" ${ disable == true ? "disabled" : "" }>
                </div>
            </div>
        </div>
    `);
}



/**
 * @description Titulos y botones
 */

const titulo = text => {
    $("#box").append(`<h5 class="text-center my-5">${ text }</h5>`)
}


const subtitulo = text => {
    $("#box").append(`<h6 class="my-4">${ text }</h6>`)
}


const btn_pagar = () => {
    $("#box").append(`
        <div class="d-flex justify-content-end mb-5">
            <button type="submit" id="btn_pagar" class="btn btn-primary my-2 px-5">Pagar</button>
        </div>
    `);
}


const setTable = async () => {
    await $("#box2").append(`
        <h6 class="my-4">Pagos anteriores</h6>

        <table id="table"></table>
    `);
}



const validField = field => {
    if ( field.val() == "" || field.val() == null || field.val() == undefined )
    {
        field.addClass("is-invalid");
        return true
    }
    else
    {
        field.removeClass("is-invalid");
        return false
    }
}