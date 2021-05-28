import ShapePoints from "../Algorithm/DotsSpreading"
import GetLongestLine from "./LongestLinePossible"


const tryLongestPath = (Points) => {
    console.log(Points , 'Points')
    let SpreadedPoints = ShapePoints(Points);
    console.log(SpreadedPoints)
    let LongestPath = GetLongestLine(SpreadedPoints)
    console.log(LongestPath)
    return LongestPath
}

export default tryLongestPath