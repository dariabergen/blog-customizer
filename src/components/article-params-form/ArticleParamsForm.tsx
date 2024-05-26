import styles from './ArticleParamsForm.module.scss';
import { Button } from 'components/button';
import { FormEvent, useEffect, useRef, useState, useCallback } from 'react';
import { Separator } from '../separator';
import clsx from 'clsx';
import { Text } from '../text';
import { ArrowButton } from '../arrow-button';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import {
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	ArticleStateType,
} from 'src/constants/articleProps';

type IArticleParamsFormProps = {
	setPageStyle: (data: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ setPageStyle }: IArticleParamsFormProps) => {
	const [isOpen, setStateIsOpen] = useState<boolean>(false);
	const [dataForm, setDataForm] = useState<ArticleStateType>(defaultArticleState);
	const panelRef = useRef<HTMLElement | null>(null);
    const handleTogglePanel = useCallback(() => {
		setStateIsOpen(prev => !prev);
	}, []);

	const handleClosePanelWithOverlay = useCallback((e: MouseEvent) => {
		if (isOpen && panelRef.current && !panelRef.current.contains(e.target as Node)) {
			setStateIsOpen(false);
		}
	}, [isOpen]);

	const handleOnChange = useCallback((data: OptionType, name: string) => {
		setDataForm(prev => ({
			...prev,
			[name]: data,
		}));
	}, []);

	const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setPageStyle(dataForm);
	};

	const handleOnReset = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setDataForm(defaultArticleState);
		setPageStyle(defaultArticleState);
	};

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClosePanelWithOverlay);
		}
		return () => {
			document.removeEventListener('mousedown', handleClosePanelWithOverlay);
		};
	}, [isOpen, handleClosePanelWithOverlay]);

	return (
		<>
			<ArrowButton isOpen={isOpen} handler={handleTogglePanel} />
			<aside
				ref={panelRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleOnSubmit}
					onReset={handleOnReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={dataForm.fontFamilyOption}
						options={fontFamilyOptions}
						placeholder={defaultArticleState.fontFamilyOption.title}
						onChange={(data) => handleOnChange(data, 'fontFamilyOption')}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={dataForm.fontSizeOption}
						onChange={(data) => handleOnChange(data, 'fontSizeOption')}
						title='Размер шрифта'
					/>
					<Select
						selected={dataForm.fontColor}
						options={fontColors}
						placeholder={defaultArticleState.fontColor.title}
						onChange={(data) => handleOnChange(data, 'fontColor')}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={dataForm.backgroundColor}
						options={backgroundColors}
						placeholder={defaultArticleState.backgroundColor.title}
						onChange={(data) => handleOnChange(data, 'backgroundColor')}
						title='Цвет фона'
					/>
					<Select
						selected={dataForm.contentWidth}
						options={contentWidthArr}
						placeholder={defaultArticleState.contentWidth.title}
						onChange={(data) => handleOnChange(data, 'contentWidth')}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};

