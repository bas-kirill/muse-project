import React from "react";
import "./CatalogueFilterWidget.css";

export function CatalogueFilterWidget() {
    return (
        <div id="catalogue-filters">
            <div>
                Тип: <br/>
                <div>
                    <input type="checkbox" id="keyboard" name="keyboard"/>
                    <label htmlFor="keyboard">Клавишный</label>
                </div>

                <div>
                    <input type="checkbox" id="stringed" name="stringed"/>
                    <label htmlFor="stringed">Струнный</label>
                </div>

                <div>
                    <input type="checkbox" id="wind" name="wind"/>
                    <label htmlFor="wind">Струнный</label>
                </div>
            </div>

            <div>
                Производитель: <br/>
                <div>
                    <input type="checkbox" id="foo" name="foo"/>
                    <label htmlFor="foo">Foo</label>
                </div>

                <div>
                    <input type="checkbox" id="bar" name="bar"/>
                    <label htmlFor="bar">Bar</label>
                </div>

                <div>
                    <input type="checkbox" id="abacaba" name="abacaba"/>
                    <label htmlFor="abacaba">Abacaba</label>
                </div>
            </div>

            <div>
                Дата изготовления:<br/>
                <input type="text"/>
                <input type="text"/>
            </div>

            <div>
                Дата выпуска:<br/>
                <input type="text"/>
                <input type="text"/>
            </div>

            <div>
                Страна: <br/>
            </div>

            <div>
                Основные инструменты: <br/>
                <div>
                    <input type="checkbox" id="wood" name="wood"/>
                    <label htmlFor="wood">Дерево</label>
                </div>

                <div>
                    <input type="checkbox" id="metall" name="metall"/>
                    <label htmlFor="metall">Металл</label>
                </div>
            </div>
        </div>
    )
}