class MicProcessor extends AudioWorkletProcessor {
  process(inputs, outputs, parameters) {
    const input = inputs[0];
    let sum = 0;
    let inputCount = 0;

    if (input.length > 0) {
      const channelData = input[0]; // We're processing the first audio channel
      for (let i = 0; i < channelData.length; i++) {
        sum += Math.abs(channelData[i]);
        inputCount++;
      }
    }

    const average = sum / inputCount;

    this.port.postMessage(average); // Send the average volume to the main thread
    return true;
  }
}

registerProcessor("mic-processor", MicProcessor);
