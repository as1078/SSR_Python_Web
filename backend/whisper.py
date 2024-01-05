from pathlib import Path

import torch
from datasets import Dataset
from datasets import Audio
from transformers import pipeline, AutoModelForSpeechSeq2Seq, AutoProcessor


class Whisper:
    def __init__(self):
        print("Configuring Whisper")
        self.device = "cuda:0" if torch.cuda.is_available() else "cpu"
        self.torch_dtype = torch.float16 if torch.cuda.is_available() else torch.float32
        self.model = AutoModelForSpeechSeq2Seq.from_pretrained(
            "openai/whisper-large-v2",
            torch_dtype=self.torch_dtype,
            low_cpu_mem_usage=True,
            use_safetensors=True,
            #attn_implementation="sdpa",
        )
        self.processor = AutoProcessor.from_pretrained("openai/whisper-large-v2")
        self.model.to(self.device)
        self.asr = pipeline(
            "automatic-speech-recognition",
            model=self.model,
            tokenizer=self.processor.tokenizer,
            feature_extractor=self.processor.feature_extractor,
            max_new_tokens=128,
            chunk_length_s=15,
            batch_size=4,
            torch_dtype=self.torch_dtype,
            device=self.device,
        )
        
    def obtain_transcript(self,
        audio_path: str,
        num_inference_steps: int = 50,

    ) -> str:
        #audio_path = "/Users/amansingh/Documents/ssr_audio_dataset/audio/6412ba078a3197d8284889fa.wav"
        audio_dataset = Dataset.from_dict({"audio": [audio_path]}).cast_column("audio", Audio(sampling_rate=16000))
        result = self.asr(audio_dataset[0]["audio"])
        return result['text']
