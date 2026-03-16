import { test, Browser, Page, expect } from '@playwright/test';
import { Search } from '../Pages/SearchPages';

let browser: Browser;
let page: Page;
let search: Search;

test.describe('Ticket search functionality', () => {

    test.beforeEach(async ({ page }) => {
        search = new Search(page);
        
        //Arrange
        await test.step('Navegando a central de pasajes', async () => {
            await page.goto('');
        });
    });

    test('Verificar WEB principal', async ({ page }) => {

        //Assert
        await expect(page).toHaveTitle('Pasajes en micro | Viajá en bus con Central de Pasajes');
    });

    test('Ingresar texto en los campos', async ({ page }) => {

        await test.step('Verificar ingresar texto en campo Origen', async () => {
            //Action
            await expect(search.inputOrigen).toBeEnabled();
            await search.origenInput();
            await search.textoOrigen.fill('(BUE) Buenos Aires. Terminal');
            await search.origenTextoClick();
            //Assert
            await expect(search.clickTextoOrigen).not.toBeVisible();
            await page.keyboard.press('Escape');
        });

        await test.step('Verificar ingresar texto en campo Destino', async () => {
            //Action
            await expect(search.inputDestino).toBeVisible();
            await search.destinoInput();
            await search.textoDestino.fill('(FLO) Florianopolis (Santa Catarina) (Brasil)');
            await search.textoDestino.press('Backspace');
            await search.destinoTextoClick();
        });
    });

    test('Validar selección del radio button Ida y vuelta', async ({ page }) => {

        await test.step('Seleccionar el radio button Ida y vuelta', async () => {
            //Action
            await search.vueltaYida();
            //Assert
            await expect(search.idaYvuelta).toBeChecked();
        });

        await test.step('Seleccionar el radio button Ida y vuelta', async () => {
            //Action
            await search.idaSolo();
            //Assert
            await expect(search.soloIDA).toBeChecked();
        });

    });

    test('Happy Path Busqueda exitosa solo ida', async ({ page }) => {
        
        await test.step('Origen del pasaje', async () => {
            //Action
            await expect(search.inputOrigen).toBeEnabled();
            await search.origenInput();
            await search.textoOrigen.fill('(BUE) Buenos Aires. Terminal');
            await search.origenTextoClick();
            //Assert
            await expect(search.clickTextoOrigen).not.toBeVisible();
            await page.keyboard.press('Escape');
        })

        await test.step('Destino del pasaje', async () => {
            //Action
            await expect(search.inputDestino).toBeVisible();
            await search.destinoInput();
            await search.textoDestino.fill('(FLO) Florianopolis (Santa Catarina) (Brasil)');
            await search.textoDestino.press('Backspace');
            await search.destinoTextoClick();
        })

       await test.step('Solo ida', async () => {
            //Action
            await search.idaSolo();
            //Assert
            await expect(search.soloIDA).toBeChecked();
        })

         await test.step('Fecha solo ida', async () => {
            //Action
            await search.idaFecha();
            //Assert
            await expect.soft(search.numeroIda,'No se encontro la fecha').toBeVisible();
        })

        await test.step('Pasajeros de boleto solo ida', async () => {
            //Action
            await search.pasajerosNumero();
            await expect(search.numeroPasajeros,'no se visualiza elnumero de pasajero').toBeVisible(); 
            await search.buscarBoton();
            //Assert
            await expect.soft(search.confirmarFecha,'No se encontro Fecha').toBeVisible();
            await expect.soft(search.textoHeader,'No se visualiza el Header').toContainText('Seleccioná tu viaje de');
        })
        
    })

      test('Happy Path Busqueda exitosa ida y Vuelta', async ({ page }) => {
        
        await test.step('Origen del pasaje', async () => {
            //Action
            await expect(search.inputOrigen).toBeEnabled();
            await search.origenInput();
            await search.textoOrigen.fill('(BUE) Buenos Aires. Terminal');
            await search.origenTextoClick();
            //Assert
            await expect(search.clickTextoOrigen).not.toBeVisible();
            await page.keyboard.press('Escape');
        })

        await test.step('Destino del pasaje', async () => {
            //Action
            await expect(search.inputDestino).toBeVisible();
            await search.destinoInput();
            await search.textoDestino.fill('(FLO) Florianopolis (Santa Catarina) (Brasil)');
            await search.textoDestino.press('Backspace');
            await search.destinoTextoClick();
        })

       await test.step('ida y vuelta', async () => {
            //Action
            await search.vueltaYida();
            //Assert
            await expect(search.idaYvuelta).toBeChecked();
        })

         await test.step('Fecha solo ida', async () => {
            //Action
            await search.idaFecha();
            //Assert
            await expect.soft(search.numeroIda,'No se encontro la fecha').toBeVisible();
        })

        await test.step('Fecha ida y Vuelta', async () => {
            //Action
            await search.idaYVueltaFecha();
            //Assert
            await expect.soft(search.numeroIdaYVuelta,'No se encontro la fecha').toBeVisible();
        })

        await test.step('Pasajeros de boleto solo ida', async () => {
            //Action
            await search.pasajerosNumero();
            await expect(search.numeroPasajeros,'no se visualiza elnumero de pasajero').toBeVisible(); 
            await search.buscarBoton();
            //Assert
            await expect.soft(search.confirmarFecha,'No se encontro Fecha').toBeVisible();
            await expect.soft(search.textoHeader,'No se visualiza el Header').toContainText('Seleccioná tu viaje de');
        })
        
    })

    test('Busqueda Sin Resultado exitoso', async ({ page }) => {
        
        await test.step('Origen del pasaje', async () => {
            //Action
            await expect(search.inputOrigen).toBeEnabled();
            await search.origenInput();
            await search.textoOrigen.fill('(BUE) Buenos Aires. Terminal');
            await search.origenTextoClick();
            //Assert
            await expect(search.clickTextoOrigen).not.toBeVisible();
            await page.keyboard.press('Escape');
        })

        await test.step('Destino del pasaje', async () => {
            //Action
            await expect(search.inputDestino).toBeVisible();
            await search.destinoInput();
            await search.textoDestino.fill('(bra)');
            await search.textoDestino.press('Backspace');
            await search.destinoTextoClick();
        })

       await test.step('ida y vuelta', async () => {
            //Action
            await search.vueltaYida();
            //Assert
            await expect(search.idaYvuelta).toBeChecked();
        })

         await test.step('Fecha solo ida', async () => {
            //Action
            await search.negativaIdaNumero();
            //Assert
            await expect.soft(search.numeroIdaNegativa,'No se encontro la fecha').toBeVisible();
        })

        await test.step('Fecha ida y Vuelta', async () => {
            //Action
            await search.negativaIdaYVuelta();
            //Assert
            await expect.soft(search.numeroIdaYVueltaNegativa,'No se encontro la fecha').toBeVisible();
        })

        await test.step('Pasajeros de boleto solo ida', async () => {
            //Action
            await search.pasajerosNumero();
            await expect(search.numeroPasajeros,'no se visualiza elnumero de pasajero').toBeVisible(); 
            await search.buscarBoton();
            //Assert
            await expect.soft(search.popUpHeader,'No se encontro texto').toBeVisible();
            await expect.soft(search.popUptexto,'No se visualiza el Header').toContainText('No encontramos opciones para tu viaje. Intentá con otra fecha, origen o destino. Si vas a la Costa, recordá que algunas localidades no tienen terminal, pero podés viajar a la más cercana.');
        })
    })

     test.fixme('Confirmando Fecha y dar Back a al pagina ', async ({ page }) => {
        
        await test.step('Origen del pasaje', async () => {
            //Action
            await expect(search.inputOrigen).toBeEnabled();
            await search.origenInput();
            await search.textoOrigen.fill('(BUE) Buenos Aires. Terminal');
            await search.origenTextoClick();
            //Assert
            await expect(search.clickTextoOrigen).not.toBeVisible();
            await page.keyboard.press('Escape');
        })

        await test.step('Destino del pasaje', async () => {
            //Action
            await expect(search.inputDestino).toBeVisible();
            await search.destinoInput();
            await search.textoDestino.fill('(FLO) Florianopolis (Santa Catarina) (Brasil)');
            await search.textoDestino.press('Backspace');
            await search.destinoTextoClick();
        })

       await test.step('ida y vuelta', async () => {
            //Action
            await search.vueltaYida();
            //Assert
            await expect(search.idaYvuelta).toBeChecked();
        })

         await test.step('Fecha solo ida', async () => {
            //Action
            await search.idaFecha();
            //Assert
            await expect.soft(search.numeroIda,'No se encontro la fecha').toBeVisible();
        })

        await test.step('Fecha ida y Vuelta', async () => {
            //Action
            await search.idaYVueltaFecha();
            //Assert
            await expect.soft(search.numeroIdaYVuelta,'No se encontro la fecha').toBeVisible();
        })

        await test.step('Pasajeros de boleto solo ida', async () => {
            //Action
            await search.pasajerosNumero();
            await expect(search.numeroPasajeros,'no se visualiza elnumero de pasajero').toBeVisible(); 
            await search.buscarBoton();
            //Assert
            await expect.soft(search.confirmarFecha,'No se encontro Fecha').toBeVisible();
            await expect.soft(search.textoHeader,'No se visualiza el Header').toContainText('Seleccioná tu viaje de');
        })

        await test.step('Regresar a la Pagina de Search', async () => {
            //Action
            await page.goBack();
        })
        
        await test.step('Ingresar Fecha que ya Expiro en el Retorno', async () => {
            //Action
            await search.expiradoRetornonumero();
            //Assert
            await expect.soft(search.textFechaExpirada,'No se visualiza Texto indicado').toHaveText('Por favor, completá todos los datos para realizar la búsqueda.')
        })
        
        await test.step('Ingresar otra fecha de Retorno', async () => {     
            //Action
            await search.idaFecha();
            await search.idaYVueltaFecha();
        }) 
    })

     test('Confirmacion de Butacas', async ({ page }) => {
        
        await test.step('Origen del pasaje', async () => {
            //Action
            await expect(search.inputOrigen).toBeEnabled();
            await search.origenInput();
            await search.textoOrigen.fill('(BUE) Buenos Aires. Terminal');
            await search.origenTextoClick();
            //Assert
            await expect(search.clickTextoOrigen).not.toBeVisible();
            await page.keyboard.press('Escape');
        })

        await test.step('Destino del pasaje', async () => {
            //Action
            await expect(search.inputDestino).toBeVisible();
            await search.destinoInput();
            await search.textoDestino.fill('(FLO) Florianopolis (Santa Catarina) (Brasil)');
            await search.textoDestino.press('Backspace');
            await search.destinoTextoClick();
        })

       await test.step('ida y vuelta', async () => {
            //Action
            await search.vueltaYida();
            //Assert
            await expect(search.idaYvuelta).toBeChecked();
        })

         await test.step('Fecha para confirmar Boleto', async () => {
            //Action
            await search.ConfirmacionBoletoFecha();
        })

        await test.step('Comprar Boleto', async () => {
            //Action
            await search.compraBoleto.click();
            await search.elegirButacaDisponible();
            await search.elegirButacaDisponible();
            await search.botonContiuar.click();
            //Assert
            await expect.soft(search.popUpHeader,'No se encontro texto').toBeVisible();
            await expect.soft(search.popUptexto,'No se visualiza el Header').toContainText('No encontramos opciones para tu viaje. Intentá con otra fecha, origen o destino. Si vas a la Costa, recordá que algunas localidades no tienen terminal, pero podés viajar a la más cercana.');
        });      
    })
});