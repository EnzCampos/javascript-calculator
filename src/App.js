/* eslint-disable eqeqeq */
import React, { useEffect } from 'react'

export default function App() {
    const [number, setNumber] = React.useState([0]);
    const [operand, setOperand] = React.useState([]);
    const [operator, setOperator] = React.useState('');
    const [theme, setTheme] = React.useState(localStorage.getItem('theme') 
    ? localStorage.getItem('theme') : 'theme1');

    function changeTheme() {

        if (theme == 'theme1') {
            localStorage.setItem('theme', `theme2`);
            setTheme(`theme2`) ;
        }
        if (theme == 'theme2') {
            localStorage.setItem('theme', `theme3`);
            setTheme(`theme3`);
        }
        if (theme == 'theme3') {
            localStorage.setItem('theme', `theme1`);
            setTheme(`theme1`);
        }
    }

    useEffect(()=>{
        document.documentElement.className = theme   
    },[theme])

    function clear() {
        if (number == 0) {
            setNumber([0]);
            setOperator('');
            setOperand([]);
        }
        else {
            setNumber([0]);
        }
    }
    
    function handleChange(event) {
        let newArr = [...number];
        
        if (event.target.value == 0 && newArr[0] === 0 && newArr[1] !== '.') {
            return
        } 
        
        if (newArr.includes('.') && event.target.value == '.') {
            return
        }
        
        if (newArr[0] === 0 && event.target.value !== '.' && newArr[1] !== '.') {
            setNumber(event.target.value);
            return;
        }
        
        else {
            newArr.push(event.target.value);
            setNumber(newArr);
        }
    }
    
    function handleOperator(event) {
        if (operator === '' && operand.length !== 0) {
            setOperator(`${event.target.value}`);
            setNumber([0]);
            
        } else if (operator === '') {
            setOperator(`${event.target.value}`);
            setOperand(number);
            setNumber([0]);
            
        } else {
            handleResult();
            setOperator(`${event.target.value}`);
        }
    } 
    
    function numberFix(numberArr) {
        if (numberArr.length <= 1) {
            return numberArr;
        } else {
            return numberArr.join('');
        }
    } 
    
    function negate() {
        if (number.length > 0) {
            setNumber([parseFloat(numberFix(number)) * -1])
        }
        else {
            setOperand([parseFloat(numberFix(operand)) * -1])
        };   
    }
    
    function handleResult() {
        // eslint-disable-next-line default-case
        switch(operator){
        case 'x':
            setNumber([]);
            setOperand([parseFloat(numberFix(operand)) * parseFloat(numberFix(number))]);
            setOperator('');
            break
        case '/':
            setNumber([]);
            setOperand([parseFloat(numberFix(operand)) / parseFloat(numberFix(number))]);
            setOperator('');
            break
        case '-':
            setNumber([]);
            setOperand([parseFloat(numberFix(operand)) - parseFloat(numberFix(number))]);
            setOperator('');
            break
        case '+':
            setNumber([]);
            setOperand([parseFloat(numberFix(operand)) + parseFloat(numberFix(number))]);
            setOperator('')
            break
        }        
    }
    
    return (
        <div id='calculator' className='calculator'>
            <header>
                <h3>calc</h3>
                <div className='theme-selector'>
                    <h5>THEME</h5>
                    <div className='theme-selector-display' onClick={changeTheme}>
                        <div className='theme-number'>
                            <div>1</div>
                            <div>2</div>
                            <div>3</div>
                        </div>
                        <div className='selector'>
                            <div className={`ball + ${theme}`}></div>
                        </div>
                    </div>
                </div>
            </header>
            <section id='display' className='display'>
                {operand} {operator} {number}
            </section>
            <main id='keys' className='keys-grid'>
                <button id='seven' className='key' onClick={handleChange} value='7'>7</button>
                <button id='eight' className='key' onClick={handleChange} value='8'>8</button>
                <button id='nine' className='key' onClick={handleChange} value='9'>9</button>
                <button id='negate' className='key secondary-key' onClick={negate}>+/-</button>
                <button id='four' className='key' onClick={handleChange} value='4'>4</button>
                <button id='five' className='key' onClick={handleChange} value='5'>5</button>
                <button id='six' className='key' onClick={handleChange} value='6'>6</button>
                <button id='add' className='key' onClick={handleOperator} value='+'>+</button>
                <button id='one' className='key' onClick={handleChange} value='1'>1</button>
                <button id='two' className='key' onClick={handleChange} value='2'>2</button>
                <button id='three' className='key' onClick={handleChange} value='3'>3</button>
                <button id='subtract' className='key' onClick={handleOperator} value='-'>-</button>
                <button id='decimal' className='key' onClick={handleChange} value='.'>.</button>
                <button id='zero' className='key zero' value='0' onClick={handleChange}>0</button>
                <button id='divide' className='key' onClick={handleOperator} value='/'>/</button>
                <button id='multiply' className='key' onClick={handleOperator} value='x' >x</button>
                <button id='clear' className='key secondary-key clear' onClick={clear}>{number == 0 ? 'AC' : 'CE'}</button>
                <button id='equals' className='key terciary-key equal' onClick={handleResult}>=</button>
            </main>
        </div>
        
    )
}