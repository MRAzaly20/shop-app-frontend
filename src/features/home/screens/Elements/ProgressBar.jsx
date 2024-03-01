import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const ProgressBar = ({ progress, color }) => {
    // progress is a number between 0 and 1
    // color is a string for the progress bar color
    const progressVal = progress / 2;
    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.bar,
                    { width: progressVal, backgroundColor: color }
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 5,
        width: "87%",
        backgroundColor: "white",
        borderColor: "rgba(235,14,14,0.63)",
        borderWidth: 0.5,
        borderRadius: 5
    },
    bar: {
        height: "100%",
        borderRadius: 5
    }
});

export { ProgressBar };
