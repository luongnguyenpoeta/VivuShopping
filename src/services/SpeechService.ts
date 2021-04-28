import { apiService } from "./APIService";

export async function textToSpeech(input: string) {
    const params = new URLSearchParams();
    params.append('input', input);

    const response = await apiService.post('https://api.zalo.ai/v1/tts/synthesize', params, {
        headers: {
            apikey: 'eVm5Ztoy2fm5qZsI7E70LDGq1PZUU3sg'
        }
    })

    console.log(response)
    return response.data.data.url
}