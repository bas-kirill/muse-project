import React from 'react';
import "./Catalogue.css";
import {Header} from "widgets/header";
import {Footer} from "widgets/footer"
import guitarImg from "./electric-guitar-gray.jpg";
import {useLoaderData} from "react-router-dom";
import {GetInstrumentsResponse} from "@pages/catalogue/api/loader";

export function Catalogue() {
    const instruments = useLoaderData() as GetInstrumentsResponse;  // https://github.com/remix-run/react-router/discussions/9792

    return (
        <div id="catalogue">
            <Header/>

            <form id="catalogue-search-bar-form">
                <input type="text" placeholder={"Search..."}/>
                <input type={"submit"} value={"Find"}/>
            </form>

            <div id="catalogue-filter-serp-wrapper">
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
                <div id="catalogue-serp">
                    {instruments.map(instrument => (
                        <div className="instrument-card">
                            <img src={guitarImg} width={100} height={200} alt={"Guitar Gray"}/>
                            <div className="instrument-card-description">
                                <h2>{instrument.name}</h2>
                                <b>Тип</b>: {instrument.type}<br/>
                                <b>Производитель</b>: {instrument.manufacturer}<br/>
                                <b>Дата изготовления</b>: {instrument.manufacturerDate}<br/>
                                <b>Дата выпуска</b>: {instrument.releaseDate}<br/>
                                <b>Страна</b>: {instrument.country}<br/>
                                <b>Основные материалы</b>: {instrument.basicMaterials}<br/>
                            </div>
                        </div>
                    ))}


                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default Catalogue;