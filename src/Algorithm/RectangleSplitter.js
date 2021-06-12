

const RectangleSplitter = (width ,  height) => {
    let counterArray = [0,0,0]
    let TempminimumWaste = 0
    let FinalMinimumWaste =100
    let remain = 0
    let TempMinimumWidth = 0
    let FinalCounterArray = []
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
            FinalMinimumWaste = Math.abs((height - ((counterArray[0] * 2) +(counterArray[1] * 3) + (counterArray[2] * 4))))
            FinalCounterArray = [...counterArray]
        }
        counterArray = [0,0,0]
    }
    return [FinalCounterArray ,FinalMinimumWaste ]
}

export default RectangleSplitter