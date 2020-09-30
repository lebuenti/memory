import "./colorpicker.scss"
import React, {useState} from "react"

export default function ColorPicker(props) {
    const colors = ['#EC7063', '#AF7AC5', '#5499C7', '#45B39D', '#F4D03F', '#F39C12', '#CACFD2', '#7B241C',
        '#6C3483', '#1A5276', '#0E6655', '#00CED1'];
    const [currentBtn, setCurrentBtn] = useState(undefined);

    const submitColor = (btn) => {
        setCurrentBtn(btn);
        props.onColorClicked(colors[btn]);
    }

    return <>
        <div id="color-picker" className="row">
            <button type="button" onClick={() => submitColor(0)}
                    className={currentBtn === 0 ? 'big' : 'small'}
                    style={{'backgroundColor': colors[0]}}/>
            <button type="button" onClick={() => submitColor(1)}
                    className={currentBtn === 1 ? 'big' : 'small'}
                    style={{'backgroundColor': colors[1]}}/>
            <button type="button" onClick={() => submitColor(2)}
                    className={currentBtn === 2 ? 'big' : 'small'}
                    style={{'backgroundColor': colors[2]}}/>
            <button type="button" onClick={() => submitColor(3)}
                    className={currentBtn === 3 ? 'big' : 'small'}
                    style={{'backgroundColor': colors[3]}}/>
            <button type="button" onClick={() => submitColor(4)}
                    className={currentBtn === 4 ? 'big' : 'small'}
                    style={{'backgroundColor': colors[4]}}/>
            <button type="button" onClick={() => submitColor(5)}
                    className={currentBtn === 5 ? 'big' : 'small'}
                    style={{'backgroundColor': colors[5]}}/>
            <button type="button" onClick={() => submitColor(6)}
                    className={currentBtn === 6 ? 'big' : 'small'}
                    style={{'backgroundColor': colors[6]}}/>
            <button type="button" onClick={() => submitColor(7)}
                    className={currentBtn === 7 ? 'big' : 'small'}
                    style={{'backgroundColor': colors[7]}}/>
            <button type="button" onClick={() => submitColor(8)}
                    className={currentBtn === 8 ? 'big' : 'small'}
                    style={{'backgroundColor': colors[8]}}/>
            <button type="button" onClick={() => submitColor(9)}
                    className={currentBtn === 9 ? 'big' : 'small'}
                    style={{'backgroundColor': colors[9]}}/>
            <button type="button" onClick={() => submitColor(10)}
                    className={currentBtn === 10 ? 'big' : 'small'}
                    style={{'backgroundColor': colors[10]}}/>
            <button type="button" onClick={() => submitColor(11)}
                    className={currentBtn === 11 ? 'big' : 'small'}
                    style={{'backgroundColor': colors[11]}}/>
        </div>
    </>
}