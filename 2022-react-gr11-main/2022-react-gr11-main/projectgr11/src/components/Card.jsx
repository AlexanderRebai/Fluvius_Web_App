import React, {useState, useCallback} from "react";


function Card(props){
    
    // const test = useCallback(() => {
    //     props.onSelect(props.NAME, props.CATEGORIEID);
    //   }, []);

    return(
        <div class="card">
            <div>
              <div class="numbers">Categorie</div>
              <div class="cardName">{props.NAME}</div>
            </div>
            <div class="idonBx">
              <ion-icon name="eye-outline"></ion-icon>
            </div>
          </div>
    );
}

export default Card;