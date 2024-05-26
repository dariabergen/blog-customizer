import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

export type OnClick = () => void;

type ArrowButtonProps = {
	isOpen: boolean;
	handler: React.MouseEventHandler;
};

export const ArrowButton = ({ isOpen, handler }: ArrowButtonProps) => {
	return (
		<div
			onClick={handler}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx({
				[styles.container]: true,
				[styles.container_open]: isOpen,
			})}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx({
					[styles.arrow]: true,
					[styles.arrow_open]: isOpen,
				})}
			/>
		</div>
	);
};
