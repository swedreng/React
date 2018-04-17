export function dateTime(payload) {
    var degisken = payload.replace(" ","");
    var deger = degisken.substring(2,5)
    var degerG = degisken.substring(2,4)
    if(deger == 'aki'){
        deger = degisken.substring(0,1)
        deger = deger+"dk"

    }else if(deger == 'dak'){
        deger = degisken.substring(0,2)
        deger = deger+"dk"

    }
    else if(deger == 'aat'){
        deger = degisken.substring(0,1)
        deger = deger+'s'

    }else if(deger == 'saa'){
        deger = degisken.substring(0,2)
        deger = deger+'s'

    }
    else if (deger == 'ani'){
        deger = degisken.substring(0,1)
        deger = deger+'sn'

    }else if (deger == 'san'){
        deger = degisken.substring(0,2)
        deger = deger+'sn'
        
    }else if(degerG == 'ün'){
        deger = degisken.substring(0,1)
        deger = deger+'g'
        
    }else if(degerG == 'gün'){
        deger = degisken.substring(0,2)
        deger = deger+'g'
    }else if( deger == 'aft'){
        deger = degisken.substring(0,1)
        deger = deger+'h'
    }
    
    return deger
}