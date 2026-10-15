import { useState } from 'react';
import { Text, View } from 'react-native';
import type { Question } from '../data/mathCourse';
import { MathExpression } from './MathExpression';
import { AlgebraModel } from './AlgebraModel';
import { MathDiagram } from './MathDiagram';
import { MotionPressable } from './Motion';

/** The compact mathematical stage is shared by lessons and the local audit. */
export function QuestionStage({question,equation}:{question:Question;equation?:string}) {
 const [details,setDetails]=useState(false);
 return <View className="mb-3">
  {!!(equation??question.equation)&&<MathExpression value={equation??question.equation!}/>}
  {question.algebraModel&&<AlgebraModel {...question.algebraModel}/>}
  {question.diagram&&<MathDiagram diagram={question.diagram}/>}
  {!!question.context&&<View><MotionPressable accessibilityRole="button" accessibilityLabel="Problem details" accessibilityState={{expanded:details}} onPress={()=>setDetails(!details)} className="min-h-11 justify-center"><Text className="ui__body-small text-text-secondary">{details?'− Hide details':'+ Problem details'}</Text></MotionPressable>{details&&<Text selectable className="ui__body text-text-primary mb-3">{question.context}</Text>}</View>}
 </View>;
}
