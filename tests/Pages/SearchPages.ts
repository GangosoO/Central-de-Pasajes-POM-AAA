import { type Locator, type Page } from "@playwright/test";

export class Search {

    readonly page: Page;
    readonly inputOrigen: Locator;
    readonly textoOrigen: Locator;
    readonly inputDestino: Locator;
    readonly textoDestino: Locator;
    readonly clickTextoOrigen: Locator;
    readonly clickTextoDestino: Locator;
    readonly idaYvuelta: Locator;
    readonly soloIDA: Locator;
    readonly fechaIda: Locator;
    readonly numeroIda: Locator;
    readonly fechaIdaYVuelta: Locator;
    readonly numeroIdaYVuelta: Locator;
    readonly numeroPasajeros: Locator;
    readonly botonBuscar: Locator;
    readonly confirmarFecha: Locator;
    readonly textoHeader: Locator;
    readonly numeroIdaNegativa: Locator;
    readonly numeroIdaYVueltaNegativa: Locator;
    readonly popUpHeader: Locator;
    readonly popUptexto: Locator;
    readonly numeroRetornoExpirado: Locator;
    readonly flechaBack: Locator;
    readonly textFechaExpirada: Locator;
    readonly confirmacionIda: Locator;
    readonly confirmacionIdaYVuelta: Locator;
    readonly compraBoleto: Locator;
    readonly puestoUno: Locator;
    readonly puestoDos: Locator;
    readonly botonContiuar: Locator;
    readonly butacasDisponibles: Locator;

    constructor(page: Page) {

        this.page = page;

        //Origen
        this.inputOrigen = page.getByRole('combobox', { name: 'Ingresá desde dónde viajás' });
        this.textoOrigen = page.getByRole('textbox', { name: 'Ingresá desde dónde viajás' });
        this.clickTextoOrigen = page.getByRole('treeitem', { name: '(BUE) Buenos Aires. Terminal' });

        //Destino
        this.inputDestino = page.getByRole('combobox', { name: 'Ingresá hacia dónde viajás' });
        this.textoDestino = page.getByRole('textbox', { name: 'Ingresá hacia dónde viajás' });
        this.clickTextoDestino = page.getByRole('treeitem', { name: '(FLO) Florianopolis (Santa' });

        //Radio Buttons
        this.idaYvuelta = page.getByText('Ida y vuelta');
        this.soloIDA = page.getByText('Sólo ida');

        //Fecha
        this.fechaIda = page.getByRole('textbox', { name: 'Ida' });
        this.numeroIda = page.locator('#cdp-calendar-container').getByText('28', { exact: true });
        this.fechaIdaYVuelta = page.getByRole('textbox', { name: 'Vuelta' });
        this.numeroIdaYVuelta = page.locator('#cdp-calendar-container-regreso').getByText('31', { exact: true });

        //Fecha No disponible
        this.numeroIdaNegativa = page.locator('#cdp-calendar-container').getByText('31', { exact: true })
        this.numeroIdaYVueltaNegativa = page.locator('#cdp-calendar-container-regreso').getByText('31', { exact: true });

        //Fecha Expirada
        this.numeroRetornoExpirado = page.locator('#cdp-calendar-container-regreso').getByText('4', { exact: true })

        //Fecha confirmacion de Boleto
        this.confirmacionIda = page.locator('#cdp-calendar-container').getByText('28', { exact: true });
        this.confirmacionIdaYVuelta = page.locator('#cdp-calendar-container-regreso').getByText('31', { exact: true });

        //Flecha de BACK en Fecha
        this.flechaBack = page.getByRole('columnheader', { name: '←' })

        //Pasajeros
        this.numeroPasajeros = page.locator('#pasajeros');

        //Buscar
        this.botonBuscar = page.getByRole('button', { name: 'Buscar' });
    

        //Atributos para Assertion
        this.confirmarFecha = page.getByText('Sabado28 Mardesde$');
        this.textoHeader = page.getByText('Seleccioná tu viaje de IDA Retiro Buenos Aires Florianopolis Modificar');
        this.textFechaExpirada = page.getByText('Por favor, completá todos los');

        //PopUp
        this.popUpHeader = page.getByText('¡Ups!');
        this.popUptexto = page.getByText('No encontramos opciones para')

        //Compra Boleto
        this.compraBoleto = page.getByRole('link', { name: 'Desde $ 231.000 por persona' })
        this.puestoUno = page.getByRole('link', { name: '09' });
        this.puestoDos = page.getByRole('link', { name: '10' });
        this.botonContiuar = page.locator('#btnSigue');

        // Butacas: links con número de asiento 
        this.butacasDisponibles = page.getByRole('link').filter({ hasText: /^\d{1,2}$/ });
    }

        // Hace click en una butaca disponible elegida al azar. 
    async elegirButacaDisponible(): Promise<void> {
        const loc = this.butacasDisponibles;
        await loc.first().waitFor({ state: 'visible', timeout: 10000 });
        const n = await loc.count();
        if (n === 0) throw new Error('No hay butacas disponibles');
        const idx = Math.floor(Math.random() * n);
        await loc.nth(idx).click();
    }

    async origenInput () {
        await this.inputOrigen.click();
    }

    async origenTextoClick () {
        await this.clickTextoOrigen.click();
    }

    async destinoInput () {
        await this.inputDestino.click();

    }

    async destinoTextoClick () {
        await this.clickTextoDestino.click();
    }

    async vueltaYida () {
        await this.idaYvuelta.click();
        await this.idaYvuelta.check();
    }

    async idaSolo () {
        await this.soloIDA.click()
        await this.soloIDA.check();
    }

    async idaFecha () {
        await this.fechaIda.click();
        await this.numeroIda.click();
    }

    async idaYVueltaFecha () {
        await this.fechaIdaYVuelta.click();
        await this.numeroIdaYVuelta.click();
    }

     async pasajerosNumero () {
        await this.numeroPasajeros.click();
        await this.numeroPasajeros.selectOption('2');
    }

    async buscarBoton () {
        await this.botonBuscar.click();
    }

    async negativaIdaNumero () {
        await this.fechaIda.click();
        await this.numeroIdaNegativa.click();
    }

     async negativaIdaYVuelta () {
        await this.fechaIdaYVuelta.click();
        await this.numeroIdaYVueltaNegativa.click();
    }  

    async expiradoRetornonumero (){
        await this.fechaIdaYVuelta.click();
        await this.flechaBack.click();
        await this.numeroRetornoExpirado.click();
        await this.botonBuscar.click();
    }

    async ConfirmacionBoletoFecha (){
        await this.fechaIda.click()
        await this.confirmacionIda.click()
        await this.fechaIdaYVuelta.click()
        await this.confirmacionIdaYVuelta.click()
        await this.numeroPasajeros.selectOption('2');
        await this.botonBuscar.click();
    }

    async boletoCompra (){
        await this.compraBoleto.click()
        await this.botonContiuar.click()
    }
}