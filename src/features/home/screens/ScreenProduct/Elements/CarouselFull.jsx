/* This file has been downloaded from rnexamples.com */
/* If You want to help us please go here https://www.rnexamples.com/help-us */
import React, { useState, useRef, useEffect } from 'react';
import {
	View,
	Text,
	ScrollView,
	Image,
	TouchableOpacity,
	StyleSheet,
	Dimensions
} from 'react-native';
const { width, height } = Dimensions.get('window');

const CarouselFull = ({
	items,
	top,
	left,
	right,
	bottom,
	marginLeft,
	marginRight,
	marginTop,
	marginBottom
}) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [activeIndex2, setActiveIndex2] = useState(0);
	const scrollViewRef = useRef(null);
	console.log('width', width);
	useEffect(() => {
		// create an interval that runs every 3 seconds
		const interval = setInterval(() => {
			// increase the index by 1
			const nextIndex = (activeIndex + 1) % items.length;
			// scroll to the next item
			scrollViewRef.current.scrollTo({
				x: nextIndex * width,
				animated: true
			});

			setActiveIndex(nextIndex);
			// update the active index
		}, 3000);
		// clear the interval when the component is unmounted
		return () => clearInterval(interval);
	}, [activeIndex]);

	return (
		<View
			top={top}
			left={left}
			right={right}
			bottom={bottom}
			marginBottom={marginBottom}
			marginTop={marginTop}
			marginLeft={marginLeft}
			marginRight={marginRight}
			style={styles.carouselContainer}>
			<View
				width={width}
				height={200}
				style={{
					borderRadius: 15,
					overflow: 'hidden'
				}}>
				<ScrollView
					ref={scrollViewRef}
					horizontal={true}
					pagingEnabled={true}
					showsHorizontalScrollIndicator={false}
					onMomentumScrollEnd={event => {
						const x = event.nativeEvent.contentOffset.x;
						const index = Math.floor(x / width);
						setActiveIndex(index);
						console.log('indexnya', index);
						console.log('activenya', activeIndex);
						if (index === activeIndex) {
							console.log('index active');
						}
						setActiveIndex(index);
					}}
					scrollEventThrottle={16}>
					{items.map((item, index) => (
						<View
							key={index}
							style={styles.itemContainer}>
							<Image
								source={{ uri: item.thumbnail }}
								style={styles.image}
							/>
							<View style={styles.textContainer}>
								<Text style={styles.title}>{item.title}</Text>
								{/*<Text style={styles.content}>{item.content}</Text>*/}
							</View>
						</View>
					))}
				</ScrollView>
			</View>
			<View style={styles.dotContainer}>
				{items.map((_, index) => (
					<TouchableOpacity
						key={index}
						onPress={() => {
							setActiveIndex(index);
							console.log(
								'TouchableOpacity pressed with index:',
								index
							);
							// add this line to scroll to the selected card
							scrollViewRef.current.scrollTo({
								x: index * width,
								animated: true
							});

							setActiveIndex(index);
						}}>
						<View
							style={[
								styles.dot,
								{
									backgroundColor:
										index === activeIndex
											? 'white'
											: 'rgba(255,255,255, .4)'
								}
							]}
						/>
					</TouchableOpacity>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	carouselContainer: {
		alignItems: 'center',
		width: 360,
		justifyContent: 'center',
		height: 245
		//backgroundColor: 'rgba(255,255,255, .4)'
	},
	itemContainer: {
		width: width - 30,
		height: 200,
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 15,
		borderRadius: 15
	},
	image: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
		borderRadius: 15
	},
	textContainer: {
		width: '90%',
		padding: 10,
		backgroundColor: 'rgba(255, 255, 255, 0.6)',
		borderRadius: 10,
		position: 'absolute',
		top: 150,
		alignItems: 'center'
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 5
	},
	content: {
		fontSize: 14,
		textAlign: 'center'
	},
	dotContainer: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		bottom: 2
	},
	dot: {
		width: 7.5,
		height: 7.5,
		borderRadius: 10,
		margin: 5,
		borderWidth: 1,
		borderColor: '#fff'
	}
});
export { CarouselFull };
