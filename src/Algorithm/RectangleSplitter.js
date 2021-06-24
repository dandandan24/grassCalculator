import { Minimize } from "@material-ui/icons"


const MinimizeStrips = (CounterArray) => {
    let minimizedArray = [0,0,0]
    let twos =  CounterArray[0]
    let threes =  CounterArray[1]   
    twos = CounterArray[0]%2
    threes = CounterArray[1]%4
    let fours = (CounterArray[0]-twos)/2
    fours += (CounterArray[1]-threes)/4  
    fours += CounterArray[2]
    minimizedArray[0] = twos
    minimizedArray[1] = threes
    minimizedArray[2] = fours
    return minimizedArray
}

const RectangleSplitter = (width ,  height) => {
    let counterArray = [0,0,0]
    let TempminimumWaste = 0
    let FinalMinimumWaste =100
    let remain = 0
    let TempMinimumWidth = 0
    let FinalCounterArray = []
    if(height < 2){
        counterArray[0] = 1
        FinalMinimumWaste = 2 -height
        return[counterArray ,FinalMinimumWaste ]
    }
    if(height > 2 && height <= 3){
        counterArray[1] = 1
        FinalMinimumWaste = 3 -height
        return[counterArray ,FinalMinimumWaste ]
    }
    if(height > 3 && height <= 4){
        counterArray[2] = 1
        FinalMinimumWaste = 4 -height
        return[counterArray ,FinalMinimumWaste ]
    }
    for(let GrassWidth = 2 ; GrassWidth <= 4 ; GrassWidth++){
        counterArray[GrassWidth - 2] = Math.floor(height / GrassWidth) - 1
        remain = GrassWidth + (height % GrassWidth)
        TempminimumWaste = GrassWidth - (remain % GrassWidth)
        TempMinimumWidth = GrassWidth
        for(let SecondWidth = 2 ; SecondWidth <= 4 ; SecondWidth++){
            if(remain !== GrassWidth && SecondWidth >= remain){
                if(Math.abs(SecondWidth - remain) < Math.abs(TempMinimumWidth - remain)){
                    TempMinimumWidth = SecondWidth
                    TempminimumWaste =  Math.abs(SecondWidth - remain)
                }
            }
        }
        counterArray[TempMinimumWidth - 2] += 1
        if(remain > TempMinimumWidth){
            counterArray[TempMinimumWidth - 2] += 1
        }
        if(Math.abs((height - ((counterArray[0] * 2) +(counterArray[1] * 3) + (counterArray[2] * 4)))) < FinalMinimumWaste){
            console.log(height,counterArray ,Math.abs((height - ((counterArray[0] * 2) +(counterArray[1] * 3) + (counterArray[2] * 4)))) , 'minimumwaste')
            FinalMinimumWaste = Math.abs((height - ((counterArray[0] * 2) +(counterArray[1] * 3) + (counterArray[2] * 4))))
            FinalCounterArray = [...counterArray]
        }
        counterArray = [0,0,0]
    }
    FinalCounterArray = MinimizeStrips(FinalCounterArray)
    return [FinalCounterArray ,FinalMinimumWaste ]
}

export default RectangleSplitter