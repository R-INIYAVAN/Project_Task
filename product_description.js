function change_container(id,id2){
    var x = document.getElementById(id);
    var y = document.getElementById(id2);
    var ids2 = ['Des','Rev'];
    ids2.forEach(info=>{
        if(info===id2){
            y.style.color = "#0D6EFD";
            y.style.borderBottom = "2px solid #0D6EFD";
        }else{
            document.getElementById(info).style.color = '#8b96a5';
            document.getElementById(info).style.borderBottom = 'none';
        }
    });

    var ids1 = ['Description','Reviews'];
    ids1.forEach(info => {
        if(info===id){
            x.style.display = 'flex';
            // x.style.flexDirection = "coloumn";
        }else{
            document.getElementById(info).style.display = 'none';
        }
    });

    

    
}