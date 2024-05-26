import styles from './App.module.scss';
import { CSSProperties, useState } from 'react';
import { Article } from '../article';
import { ArticleStateType,defaultArticleState } from 'src/constants/articleProps';
import { ArticleParamsForm } from '../article-params-form';


export const App = () => {
	const [pageStyle, setPageStyle] = useState<ArticleStateType>(defaultArticleState);

	return (
		<div
			className={styles.main}
			style={
				{
					'--font-family': pageStyle.fontFamilyOption.value,
					'--font-size': pageStyle.fontSizeOption.value,
					'--font-color': pageStyle.fontColor.value,
					'--container-width': pageStyle.contentWidth.value,
					'--bg-color': pageStyle.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setPageStyle ={setPageStyle} />
			<Article />
		</div>
	);
};




