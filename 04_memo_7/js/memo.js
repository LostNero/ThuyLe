"use strict";

window.addEventListener("DOMContentLoaded",
    function(){
        //1.localStorageが使えるか確認
        if (typeof localStorage === "undefined"){
            window.alert("このブラウザはLocal Storage機能が実装されていません");
            return;
        }else{
            viewStorage();
            saveLocalStorage();
            delLocalStorage();
            selectTable();
            allClearLocalStorage();
        }
    },false
);

//2.localStorageへの保存
function saveLocalStorage(){
    const save = document.getElementById("save");
    save.addEventListener("click",
        function(e){
            e.preventDefault();
            const key = document.getElementById("textKey").value;
            const value = document.getElementById("textMemo").value;

            //値の入力チェック
            if(key=="" || value==""){
                window.alert("Key, Memoはいずれも必須です。");
                return;
            }else{
                let w_confirm = window.confirm("LocalStorageに \n" + key + "  " + value + "\nを保存しますか。") //version-up1 add
                // OK を押されたとき,保存する
                if (w_confirm === true){//version-up1 add
                    localStorage.setItem(key,value);
                    viewStorage();
                    let w_msg = "LocalStorageに " + key + " " + value + " を保存しました。";
                    window.alert(w_msg);
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }//version-up1 add
            }
        },false
    );
};

//3.localStorageから１件削除
function delLocalStorage(){
    const del = document.getElementById("del");
    del.addEventListener("click",  
        function(e){
            e.preventDefault();
            let w_sel ="0";
            w_sel = selectCheckBox();

            if(w_sel === "1"){
                const key = document.getElementById("textKey").value;
                const value = document.getElementById("textMemo").value;
                let w_confirm = window.confirm("LocalStorageに \n" + key + "  " + value + "\nを削除しますか。")//version-up1 add
                // OK を押されたとき,削除する
                if (w_confirm === true){//version-up1 add
                    localStorage.removeItem(key);
                    viewStorage();
                    let w_msg = "LocalStorageに " + key + " " + value + " を削除しました。";
                    window.alert(w_msg);
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }//version-up1 add
            }
        },false
    );
}

//4.localStorageからすべて削除
function allClearLocalStorage(){
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click",
        function(e){
            e.preventDefault();
            let w_confirm = confirm("LocalStorageのデータをすべて削除します。\nよろしいですか?");
            if (w_confirm === true){
                localStorage.clear();
                viewStorage();
                let w_msg = "LocalStorageのデータをすべて削除しました。";
                window.alert(w_msg);
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }
        },false
    );
}

//5.データ選択
function selectTable(){
    const select = document.getElementById("select");
    select.addEventListener("click",
        function(e){
            e.preventDefault();
            selectCheckBox();
        },false
    );
}

// テーブルからデータ選択
function selectCheckBox(){
    let w_sel ="0";
    let w_cnt = 0;
    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("table1");
    let w_textKey = "";
    let w_textMemo = "";
    
    for(let i=0; i < chkbox1.length ; i++){
        if(chkbox1[i].checked){
            if(w_cnt === 0){
                w_textKey = table1.rows[i+1].cells[1].firstChild.data;
                w_textMemo = table1.rows[i+1].cells[2].firstChild.data;
                //return w_sel = "1";
            }
            w_cnt++;
        }
    }

    document.getElementById("textKey").value = w_textKey;
    document.getElementById("textMemo").value = w_textMemo;
    if(w_cnt === 1){
        return w_sel = "1";
    }else{
        window.alert("1つ選択してください。");
    }
}

// localStorageからのテーブルの取得とテーブルへ表示
function viewStorage(){
    const list = document.getElementById("list");
    //htmlのテーブル初期化
    while(list.rows[0]) list.deleteRow(0);
    //localStorageのすべての情報の取得
    for(let i=0 ; i < localStorage.length ; i++){
        let w_key = localStorage.key(i);
        //localStorageのキーよ値を表示
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        td1.innerHTML = "<input name='chkbox1' type='checkbox'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
    }

    //sortList
$("#table1").tablesorter({
    sortList: [[1,0]]
});

$("#table1").trigger("update");
}