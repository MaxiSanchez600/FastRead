/*global chrome*/
import './player.css'
import React, {useEffect} from 'react'
import ReactDOM from 'react-dom'
import Play from '../imgs/play_circle_filled.png'
import Pause from '../imgs/pause_circle_filled.png'
import Reset from '../imgs/skip_previous.png'
import Opciones from '../imgs/opciones.png'
import Close from '../imgs/close.png'
import Modal from 'react-modal';
export default function Player ({word}){
    let pausado = false;
    const [text, setText] = React.useState('')
    //const [text, setText] = React.useState('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,'.split(" "))
    const [value, setValue] = React.useState('FastRead')
    const [valueDerecha, setValueDerecha] = React.useState('read')
    const [valueIzquierda, setValueIzquierda] = React.useState('fast')
    const [time, setTime] = React.useState('100')
    const [corriendo, setCorriendo] = React.useState(false)
    const [pause, setPause] = React.useState(false)
    const [reset, setReset] = React.useState(false)
    const [estado, setEstado] = React.useState()
    const [estado2, setEstado2] = React.useState(0)
    const [drag, setDrag] = React.useState({
        diffX: 0,
        diffY: 0,
        dragging: false,
        styles: {}
    })
    const onChangeSelect = function(e){
        setTime(e.target.value)
    }
    const go = async function(){
        setCorriendo(true)
        setEstado(estado2)
    }
    const pauseButton = function(){
        setPause(true)
        setCorriendo(false)
    }

    const handleInputChange = function(e){
        setTime(e.target.value)
    }

    const resetButton = function(){
        setValue('FastRead')
        setValueIzquierda('fast')
        setValueDerecha('read')
        setReset(true)
        setCorriendo(false)
    }
    const _dragStart = function(e) {
        setDrag({
            ...drag,
            diffX: e.screenX - e.currentTarget.getBoundingClientRect().left,
            diffY: e.screenY - e.currentTarget.getBoundingClientRect().top,
            dragging: true
        });
    }

    const _dragging = function(e) {

        if(drag.dragging) {
            var left = e.screenX - drag.diffX;
            var top = e.screenY - drag.diffY;
            setDrag({
                ...drag,
                styles: {
                    left: left,
                    top: top
                }
            });
        }
    }    

    const _dragEnd = function() {
        setDrag({
            ...drag,
            dragging: false
        });
    }
    useEffect(() =>{

        //  chrome.runtime.sendMessage('ping', response => {
          //  if(chrome.runtime.lastError) {
            //  setTimeout(1000);
            //} else {
              //  setText(response.data.split(' '))
           // }
          //});
    },);
    useEffect(async () =>{
        if(estado !== -1){
            if(corriendo){
                if(estado <= text.length){
                    if(text[estado - 1]){
                        setValueIzquierda(text[estado - 1])
                    }
                    if(text[estado + 1]){
                        setValueDerecha(text[estado + 1])
                    }
                    setValue(text[estado])
                    await timeout((time))
                    setEstado(estado + 1)
                    setEstado2(estado + 1)
                }
                else{
                    setValue('FastRead')
                    setValueIzquierda('fast')
                    setValueDerecha('read')
                    setEstado2(0)
                    setEstado(-1)
                    setCorriendo(false)
                }
            }
            else{
                if(pause){
                    setEstado(-1)
                    setCorriendo(false)
                    setPause(false)
                }
                if(reset){
                    setEstado2(0)
                    setEstado(-1)
                    setCorriendo(false)
                    setReset(false)
                }
            }
        }
    }, [estado]);
    return(
        <div className = 'contenedor' style={drag.styles}>
            <div className = 'barra' onDragEnter={_dragStart} onDragOver={_dragging} onDragLeave={_dragEnd}>
            </div>
            <div>
                <div className ='nav'>
                    <label className = 'title'>FastRead</label>
                    <div className = 'navopciones'>
                            <div className = 'opciones'>
                                <img src = {Opciones}></img>
                            <div className = 'dropdown-content'>
                                <div>
                                    <label>Words per minute</label>
                                    <select onChange = {onChangeSelect}>
                                        <option>100</option>
                                        <option>200</option>
                                        <option>300</option>
                                        <option>400</option>
                                        <option>500</option>
                                        <option>600</option>
                                        <option>700</option>
                                        <option>800</option>
                                        <option>900</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className = 'dropdown'>
                            <img className = 'close' src = {Close}></img>
                        </div>
                    </div>
                </div>
            </div>
            <div className = 'WordsPlayer'>
                <div className = 'LabelsDisplay'>
                    <div className = 'div1'>
                        <label className = 'palabraizq'>{valueIzquierda}</label>
                    </div>
                    <div className = 'padrediv2'>
                        <div className = 'div2'>
                            <label className = 'palabramedio'>{value}</label>
                        </div>
                    </div>
                    <div className = 'div3'>
                        <label className = 'palabrader'>{valueDerecha}</label>
                    </div>
                </div>
                <div className = 'botonera'>
                    <div>
                        <img className = 'reset' src = {Reset} onClick = {resetButton}></img>
                        {!corriendo && <img className = 'imgButton' src = {Play} onClick = {go}></img>}
                        {corriendo &&<img className = 'imgButton' src = {Pause} onClick = {pauseButton}></img>}
                    </div>
                </div>
                <label>Speed reading {text.length} words at {time} wpm.</label>
            </div>
        </div>
    )
    function timeout(ms) {
        console.log(ms)
        console.log(60 / ms * 1000)
        return new Promise(resolve => setTimeout(resolve, ((60 / ms) * 1000)));
    }
}