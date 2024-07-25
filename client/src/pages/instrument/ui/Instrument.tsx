import React from 'react';
import "./Instrument.css";
import {Footer} from "widgets/footer";
import {Header} from "widgets/header";
import electricGuitar from "./electric-guitar-gray.jpg";
import {useLoaderData} from "react-router-dom";

interface InstrumentDetails {
    id: number
    name: string
    type: string
    manufacturer: string
    manufacturerDate: string
    releaseDate: string
    country: string
    basicMaterials: string[]
}

export function Instrument() {
    const data = useLoaderData() as InstrumentDetails;

    return (
        <div>
            <Header/>
            <div id="instrument">
                <img src={electricGuitar} width="200" height="200"  alt="Electric Guitar"/>
                <div id="instrument-details">
                    <h1>{data.name}</h1>
                    <b>Тип</b>: {data.type}<br/>
                    <b>Производитель</b>: {data.manufacturer} <br/>
                    <b>Дата изготовления</b>: {data.manufacturerDate} <br/>
                    <b>Дата выпуска</b>: {data.releaseDate} <br/>
                    <b>Страна</b>: {data.country}<br/>
                    <b>Основные материалы</b>: {data.basicMaterials}<br/>
                </div>
            </div>
            <Footer />
        </div>
    )
}