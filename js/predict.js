	// More API functions here:
	// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image
	// the link to your model provided by Teachable Machine export panel
	let URL = "https://teachablemachine.withgoogle.com/models/cZNPPPN2K/";
	//URL = "https://teachablemachine.withgoogle.com/models/VAzH0JdRs/";

	let model, webcam, labelContainer, maxPredictions;
	// Load the image model and setup the webcam
	async function init() {
		
		if($('#sex').val() == "M"){
			URL = "https://teachablemachine.withgoogle.com/models/cZNPPPN2K/";
		} else {
			URL = "https://teachablemachine.withgoogle.com/models/VAzH0JdRs/";
		}
		
		const modelURL = URL + "model.json";
		const metadataURL = URL + "metadata.json";
		// load the model and metadata
		// Refer to tmImage.loadFromFiles() in the API to support files from a file picker
		// or files from your local hard drive
		// Note: the pose library adds "tmImage" object to your window (window.tmImage)
		model = await tmImage.load(modelURL, metadataURL); 
		maxPredictions = model.getTotalClasses();
		/*labelContainer = document.getElementById("label-container");
		for (let i = 0; i < maxPredictions; i++) { // and class labels
			labelContainer.appendChild(document.createElement("div"));
		}*/
	}
	// run the webcam image through the image model
	async function predict() {
		// predict can take in an image, video or canvas html element
		var image = document.getElementById("face-image");
		const prediction = await model.predict(image, false);
		prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
		console.log(prediction[0].className);
		var resultMessage;
		var titleMessage;
		switch (prediction[0].className){
			case "평생 재물운":
				titleMessage = "재물운이 평생 따르는군요!"
				resultMessage = "차분하고 강인하고 정적인 성격입니다. 재복이 엄청 좋고 사람을 끌어들이는 매력을 가지고 있습니다. 고집이 강하나 인복은 아주 좋습니다 정이많고 인의심이 강하여 사람들이 따릅니다. 낭비벽은 심하지 않습니다. 말년운이 아주 좋고 자기 속마음을 남에게 잘 말하지 않아 아주 친한 사람말고는 속마음을 잘 알수 없습니다. 예능계통으로 직업운이 딱 맞고 정적인 성격이라 여자에게는 좀 재미가 없을 수 있습니다. 전체적으로 사람을 끌어들이는 기가 아주 강하여 성공운이 열린 얼굴이라 할 수 있습니다. 하지만 당신은 왕이 될 상이 아닙니다.";
				break;
			case "섬세,예리,끈기,의지력":
				titleMessage = "섬세,예리,끈기,의지력이 돋보이네요!"
				resultMessage = "끈기가 강합니다. 이기주의적인 성향이 있으나 성격이 세심하다고 볼 수도 있습니다. 예리하고 관찰력이 좋고 눈치가 빠릅니다. 재물에 대한 집착과 욕심이 강하고 자존심이 강합니다. 연애운이 좋고 성격이 차분하며 입이 무겁습니다. 긍정적인 성향을 가지고 있으며 말년 운은 무난한편이고 인생 자체가 무난한 편이라 할 수 있습니다. 이혼수가 있고 독신으로 살아갈 수도 있습니다. 하지만 당신은 왕이 될 상이 아닙니다.";
				break;
			case "강한 이성운":
				titleMessage = "이성운이 강합니다!"
				resultMessage = "처복이 좋고 두뇌가 빠른 머리입니다. 자아도취적인 경향도 강한 상입니다. 의지력도 강하며 무엇이든지 집중적으로 하는 스타일입니다. 연애운과 이성운이 강하여 항상 여자가 잘붙고 잘따르는 상입니다. 재물에 대한 집착이 강하여 야망이 아주 큰 편에 속합니다. 화려하고 깨끗하고 수려한 것을 추구하는 상입니다. 낙천적이고 긍정적인 마인드를 가지고 있으며 말재주가 좋은 편입니다. 인정도 많고 의리도 있으나 다혈질적인 경향도 있는 편입니다. 하지만 당신은 왕이 될 상이 아닙니다.";
				break;
			case "평탄재벌, CEO":
				titleMessage = "CEO가 좋겠구려.."
				resultMessage = "재물운이 좋으며 고집이 쎄고 자기 마음을 남들에게 들어내지 않습니다. 과묵한 면도 좀 있으며 성질이 강하고 노년운이 평탄한 관상입니다. 하지만 당신은 왕이 될 상이 아닙니다.";
				break;
			case "뛰어난 재능":
				titleMessage = "재능이 뛰어난 양반이구려!"
				resultMessage = "머리가 좋고 생각하는 범위가 아주 넓고 지혜롭습니다. 노력을 하면 공부를 잘 할 수 있는데 노력을 잘 안하는게 흠입니다. 의지가 강하고 신념이 강한 사람에 속합니다. 직업운이 강하며 재능이 다재다능한 상입니다. 그 재능으로 평생 화려한 인생을 살 수 있습니다. 하지만 당신은 왕이 될 상이 아닙니다.";
				break;
			case "빠른 사리판단":
				titleMessage = "사리판단이 빠르신 양반이구려!"
				resultMessage = "성격이 시원하면서 시크한 편입니다. 의지가 강하며 예민하고 사리 판단력이 빠릅니다. 자상한 면이 있지만 날카로운 성격도 있습니다. 결혼운은 무난한 편이며 말년운은 좋지만 자기 주장이 강하고 개인주의적인 성향도 강합니다. 냉철한 편에 속하고 이기적인면도 약간 있습니다. 하지만 의리를 내세우는 면도 있습니다. 급한 성격도 가지고 있습니다. 하지만 당신은 왕이 될 상이 아닙니다.";
				break;
			case "흠잡을데 없는 관상":
				titleMessage = "오호 흠잡을데 없소!"
				resultMessage = "성격도 시원스럽고 사회성도 좋고 처복도 좋습니다. 재복도 좋고 마음씨가 선하며 감정이 풍부합니다. 인정도 많은 편입니다. 결혼운과 처복도 좋습니다. 직업운이 좋고 의지력도 강합니다. 감각이 뛰어난 편이며 재능이 많고 독창적이고 예능 기질이 많습니다. 대인관계가 좋고 성격은 차분하면서도 약간 급한면이 있습니다. 마음씨가 넓고 자상한 편에 속합니다. 인생이 평탄하며 모든게 순풍에 돛단격입니다. 흠잡을데 없이 좋은 관상입니다. 하지만 당신은 왕이 될 상이 아닙니다.";
				break;
			case "평범한 인생을 싫어하는 반항아":
				titleMessage = "반항아의 기길을 가지고 있으시군요"
				resultMessage = "처복이 안좋거나 이혼수가 강합니다. 성격은 착하고 인정이 많습니다. 하지만 뺀질이 기질도 있고 남의 말을 잘 안 듣는 성향이 강합니다. 반항아 기질이 있으며 개성이 강하고 주관이 뚜렷합니다. 남과 다른 인생을 살려하고 평범한 인생을 싫어합니다. 활동적이며 생각보다 행동이 앞서는 성향입니다. 감수성이 예민하며 입이 무겁습니다. 쓸데없는 일에 에너지를 소비하거나 또는 허영심이 강할수도 있습니다. 전체적으로 자기 안에 또다른 자기자신을 찾아 헤메는 상입니다. 항상 이상향을 추구하는 상입니다. 하지만 당신은 왕이 될 상이 아닙니다.";
				break;
			case "강력한 정력":
				titleMessage = "변강쇠 아니시오?"
				resultMessage = "관운이 강하며 개인주의적인 성격이 강할수 있습니다. 고집이 강하고 정력도 강합니다. 가정에 충실한 편이며 처복이 좋습니다. 성격이 급할 수 있고 대인관계는 좋은 편입니다. 심사숙고형이며 성실하여 직업운이 강하고 욕심이 많습니다. 운은 평탄하고 성공과 출세가 가능한 좋은 관상입니다. 하지만 당신은 왕이 될 상이 아닙니다.";
				break;
			case "굴곡없는 인생":
				titleMessage = "인생이 굴곡없이 평탄하군요"
				resultMessage = "직업운이 강합니다. 사회성이 강하고 가정보다 일을 더 중요시하는 관상입니다. 정력이 강하고 활력이 있어서 사업을 하면 아주 좋은 관상입니다. 지적인 면이 강하여 두뇌만 좋으면 학자나 교수로 나가도 좋은 관상입니다. 기분파에 속하고 의리가 있습니다. 마음이 넓고 생각하는 것이 깊어 형이상학적인 성격입니다. 여성스럽고 다정다감한 면도 있으며 인생에 굴곡이 없을 수 있습니다. 시원하고 낙천적인 성격입니다. 하지만 당신은 왕이 될 상이 아닙니다.";
				break;
			case "좋은 여자복":
				titleMessage = "여자복이 많겠구료..";
				resultMessage = "결혼인이 좋고 배우자복이 좋습니다. 감정이 풍부하고 선하고 맑으며 심성이 착합니다. 대인관계가 좋으며 여복이 좋습니다. 마음이 넓고 입이 무거우며 의지가 강한 편입니다. 성실하여 말년운이 좋습니다. 여복이 있어 여자보는 눈이 아주 높습니다. 왠만한 여자는 쳐다보지도 않습니다. 외모가 수려하여 사람들에기 인기도 많으며 성욕 또한 강합니다. 하지만 당신은 왕이 될 상이 아닙니다.";
				break;
			case "여자에게 잘하는 남자":
				titleMessage = "애처가가 될 상이오"
				resultMessage = "사회성이 좋고 붙힘성이 좋으며 사교성이 좋습니다. 애교가 많고 자상하며 여자에게 아주 잘합니다. 강직하고 고집이 좀 강합니다. 여자들이 많이 따르며 재복이 좋고 말년운이 좋습니다. 출세와 성공운이 강하며 재복이 좋고 인복 또한 좋습니다. 전체적으로 남자다운 얼굴이면서 성격이 복합적인 성격입니다. 하지만 당신은 왕이 될 상이 아닙니다.";
				break;
			case "성공열망":
				titleMessage = "성공을 향한 열망이 강하오!"
				resultMessage = "매사 충동적인 경향이 있으며 자극과 오락을 추구합니다. 정서적 안정성이 떨어지고 중독에 약합니다. 청개구리 같은면이 있고 상대방을 통제하고 조정하려는 경향이 있습니다. 경쟁심이 강하고 창의적인 편입니다. 야망이 있어 성공을 향한 열망이 있으고 그 것을 위해 많은 시간과 에너지를 사용합니다. 예민하고 스트레스를 잘 받습니다. 개방성이 높아 새로운 생각을 잘 받아들이고 아이디어가 풍부한 편입니다. 하지만 당신은 왕이 될 상이 아닙니다.";
				break;
			case "귀인상":
				titleMessage = "귀인을 만나겠소!"
				resultMessage = "긍정적인 사고와 철저한 자기수양으로 끊임없이 노력하는 상입니다. 사물을 직시하고 도전하는 스타일입니다. 기운이 맑고 기발한 아이디어와 역발상을 가지고 있어 창의성의 뛰어납니다. 어려운 일을 당해도 귀인의 도움을 받는 복된 상입니다. 결혼을 늦게하는 것이 좋은 배우자를 만나는 비결이며 말년이 좋을 것으로 생각됩니다. 지나친 육체적 정신적 과로는 평소에 철저히 관리해야 합니다. 하지만 당신은 왕이 될 상이 아닙니다.";
				break;
			case "독신 운명":
				titleMessage = "혼자 살 운명이구려.."
				resultMessage = "사무적이고 정적인 성격입니다. 인생을 살아가면서 자기 적성만 찾으면 그 분야에서 크게 출세할 수 있습니다. 외롭고 고독한 면이 있어 결혼을 못할수가 있습니다. 자기가 열심히 노력을 하면 결혼을 할 수 있으나 노력을 안하면 운명대로 독신으로 살아갈 수도 있습니다. 고독살이 강하여 결혼을 해도 이혼하고 혼자 살아갈 수도 있습니다. 성격에 의하여 혼자 사는게 편하기 때문입니다. 정직하며 고지식한 면이 있습니다. 심사숙고형이며 입이 무겁습니다. 냉철하면서 무덤덤한 성격이며 인정이 많으면서 고집이 강합니다. 하지만 당신은 왕이 될 상이 아닙니다.";
				break;
			case "좋은 노년운":
				titleMessage = "말년운이 좋소이다!"
				resultMessage = "자상하고 온화하고 차분한 성격입니다. 고집이 아주 강할 수 있으나 그 고집을 자기 스스로 잘 다스릴수 있는 사람입니다. 노년운이 좋고 성격이 아주 강인합니다. 재물운이 평범하지만 출세를 하면 큰 부자가 될 수 있습니다. 처복은 아내와 성격차이가 일어날 가능성이 많습니다. 하지만 당신은 왕이 될 상이 아닙니다.";
				break;
			case "좋은 결혼운":
				titleMessage = "결혼운이 좋소이다!"
				resultMessage = "낭비벽이 있으니 절제를 해야합니다. 사회성이 좋으며 정에 약합니다. 고집이 있고 판단력이 빠르니 머리 회전이 빠릅니다. 처복도 좋지만 약간 외로운 성격입니다. 결혼운이 좋아서 자기가 마음만 먹으면 언제든지 할 수 있습니다. 자기 마음에 달렸습니다. 전체적으로 정적이고 사색적인 관상입니다. 하지만 당신은 왕이 될 상이 아닙니다.";
				break;
			case "결혼은늦게":
				titleMessage = "결혼은 늦게하심이..!"
				resultMessage = "집안일보다 바깥일을 좋아하고 대인관계가 좋고 사업성이 좋습니다. 개방적인 성격이며 결혼을 일찍하면 이혼수가 아주 강하여 결혼을 최대한 늦게 하는게 좋습니다. 고집과 자존심이 강합니다. 남자가 많이 따르며 남자를 많이 밝히는 스타일이기도 합니다.. 자기것은 확실히 챙기는 성격입니다. 창의력이 좋아서 디자인이나 미적감각이 좋습니다. 남편복은 좋지만 이혼수가 있고 재복이 있지만 변덕이 심할 수도 있습니다. 재복이 좋고 인복이 좋아 출세와 성공이 가능합니다. 전체적으로 남자를 조심하고 결혼을 늦게하면 좋은 관상입니다. 하지만 당신은 왕이 될 상이 아닙니다.";
				break;
			case "남편복":
				titleMessage = "남편복이 좋소이다!"
				resultMessage = "남편복이 좋습니다. 재복이 좋고 연애운 이성운도 강합니다. 자존심이 강하고 서글서글한 성격입니다. 살림을 잘하는 상이나 씀씀이가 큰편이며 대인관계가 좋습니다. 전체적으로 야무지고 당찬면이 있지만 여성스럽고 자상한 면도 있습니다. 하지만 당신은 왕이 될 상이 아닙니다.";
				break;
			case "기쎈여자":
				titleMessage = "강한 기가 느껴집니다.."
				resultMessage = "당돌한 면이 있고 인기가 많아 남자 꼬시는 재주가 있습니다. 기가 너무 강하여 남자를 기죽일 수 있으나 남편복은 있습니다. 자존심이 강하고 욕심많고 고집이 강합니다. 이기적인 면도 강합니다. 생활력이 강하며 재복과 말년운이 좋습니다. 얼굴에서 나오는 기가 강하여 겸손하고 인내심을 기르면 좋은 결과가 있을 것입니다. 하지만 당신은 왕이 될 상이 아닙니다.";
				break;
			case "빠른두뇌":
				titleMessage = "두뇌회전이 빠르시네요!"
				resultMessage = "판단력과 머리회전이 빠릅니다. 재복이 아주 좋습니다. 직업복 좋고 머리좋고 사회성이 아주 좋습니다. 성격 또한 시원시원 할 것입니다. 다만 치밀한 구석이 있을 수 있습니다. 결혼생활은 처음에는 좋다가 나중에는 안좋을수도 있습니다. 액땜으로 결혼을 늦게하는 것도 방법입니다. 왠만하면 결혼생활에서 오는 고비는 둘중에 한명이 참으면 넘길 수 있으며 둘다 참으면 백년해로 할 것입니다. 하지만 당신은 왕이 될 상이 아닙니다.";
				break;
			case "현모양처":
				titleMessage = "현모양처가 보입니다!"
				resultMessage = "내조를 잘하며 자식 교육을 잘 할 것입니다. 성욕을 좀 밝힐 수 있습니다. 자기 속마음을 잘 말하지 않으며 슬기롭고 지혜로운 성격입니다. 말년운과 직업운이 좋습니다. 남편만 잘 만나면 현모양처인데 사고치는 남편 만날 수 있어 결혼생활이 평탄하지 않을 수 있습니다. 나이를 먹으면서 남편이 좀 꼬일 수 있습니다. 남편운 뺴고는 아주 좋은 관상입니다. 낭비벽이 심하여 절제를 좀 해야 할수 있습니다. 하지만 당신은 왕이 될 상이 아닙니다.";
				break;
			case "현실주의자":
				titleMessage = "현실주의자가 보입니다!"
				resultMessage = "현실주의자이며 출세와 성공이 가능하며 정보력이 뛰어납니다. 대인관계가 아주 민첩합니다. 자기 속마음을 남에게 잘 말하지 않으며 술을 먹어야 속마음이 나옵니다. 부부관계가 부드럽지 못할 수도 있으며 상대방의 말을 잘 안듣고 자기 고집대로 가정을 꾸려나갑니다. 그래서 남편과의 사이가 안좋을 수 있습니다. 남편과 트러블 빼고는 아주 좋은 관상입니다. 하지만 당신은 왕이 될 상이 아닙니다.";
				break;
			case "자식복":
				titleMessage = "자식복이 좋소이다!"
				resultMessage = "결혼하고나서 잔걱정이 많을 수 있습니다. 남편과 자식에게는 현모양처이나 남편이 속을 썩힐수가 있습니다. 남자복이 많고 재복이 좋으나 고집이 황소고집에 가깝습니다. 자식복이 좋습니다. 예능기질이 좋고 남자운이 있어 남자가 많이 따릅니다. 자존심이 강하고 의지가 강한 상입니다. 남편과 다툼이 많을 수 있으며 이혼수가 있습니다. 하지만 당신은 왕이 될 상이 아닙니다.";
				break;
			case "넘치는매력":
				titleMessage = "매력이 넘쳐 흐릅니다.."
				resultMessage = "현모양처상이면서 슬기롭고 지혜로운 여성입니다. 남편복이 좋으며 부모복도 좋습니다. 평생 돈걱정없이 태평스럽게 살아갈 수 있습니다. 이혼 수가 있으나 최대한 결혼을 늦게하면 액땜할 수 있습니다. 매혹적이고 화개살이 강하여 사람들에게 사랑받고 이성운이 강합니다. 남자들 때문에 마음고생 하거나 이성이 많이 꼬입니다. 활동적이고 활력이 넘칩니다. 예능기질이 강하고 대인관계가 좋고 깔끔한 것을 좋아합니다. 성격이 온순하고 착하고 선합니다. 정직하고 시원한 성격이며 말년운이 좋습니다. 차분하면서 현실주의자입니다. 하지만 당신은 왕이 될 상이 아닙니다.";
				break;
			case "지혜로움":
				titleMessage = "당신의 지혜로움이 보입니다!"
				resultMessage = "현모양처상이고 지혜로운 관상입니다. 출세를 해야 재복이 들어옵니다. 그렇지 않으면 낭비벽이 심하여 평생 가난할 수 있습니다. 성격 좋고 남편복도 좋습니다. 남편과 트러블이 있을 수 있으나 지혜로운 관상이라 잘 대처해 나갈 것입니다. 하지만 당신은 왕이 될 상이 아닙니다.";
				break;
			case "남편복자식복":
				titleMessage = "말할나위 없이 좋은 관상이오!"
				resultMessage = "남편복 자식복이 좋고 인복이 있습니다. 지혜롭고 감성적이며 예민할 수 있습니다. 성격은 단순하거나 일관적이고 전체적으로 완벽한 관상입니다. 하지만 당신은 왕이 될 상이 아닙니다.";
				break;
			case "좋은사회성":
				titleMessage = "사회성이 좋구려.."
				resultMessage = "이혼수가 강하고 잔걱정이 많습니다. 남자가 꼬이고 남편때문에 마음고생하는 이마입니다. 성격이 남자다운 면도 있고 서글서글하고 붙임성도 좋아 사회성이 좋습니다. 연애운도 좋고 여성스럽고 차분한 성격입니다. 하지만 돌아서면 냉담한 면도 있습니다. 정도 많고 의리도 있습니다. 재복이 좋은 편은 아니지만 이목구비 조화가 좋습니다. 인복이 있고 개성이 강한 외모를 가지고 있어 사람의 마음을 끌어당기는 면이 강합니다. 사람을 끌어당기고 포용력이 좋아 사회생활에 너무 좋은 관상입니다. 다만 남자와 남편을 약간 무시하는 듯한 면도 있습니다. 하지만 당신은 왕이 될 상이 아닙니다.";
				break;
			case "여성적":
				titleMessage = "여성성이 강하오!"
				resultMessage = "재복이 좋고 정력이 좋습니다. 머리도 좋고 사회성이 좋지만 팔자가 쎕니다. 전체적으로 여성적이고 남편복도 좋습니다. 약간 내숭이 있고 차분하며 온화한 관상입니다. 하지만 당신은 왕이 될 상이 아닙니다.";
				break;
			case "무난한인생":
				titleMessage = "무난한 관상이오.."
				resultMessage = "남편 기도 살리고 남자에게 잘하는 관상입니다. 하지만 사고치는 남편을 만날 수 있는 관상입니다. 온순하고 공무원이나 월급쟁이 남편을 만나야 좋을 수 있습니다. 인복이 아주 좋고 재복 또한 좋습니다. 성격도 여성스럽고 차분한 성격입니다. 인생이 무난하고 자식도 잘 키울것 같습니다. 낭비벽이 심할 수 있어 절제를 하고 근검절약하는 인생을 살아야 나이먹고 돈걱정이 하지 않을 것입니다. 하지만 당신은 왕이 될 상이 아닙니다.";
				break;
			case "남자많이꼬임":
				titleMessage = "남자들이 많이 꼬입니다!"
				resultMessage = "잔머리가 잘 돌아가고 눈치가 빠릅니다. 여성스러우나 성격이 급하고 다혈질적인 성향도 있습니다. 얌체기질이 있을수 있으며 맺고 끊음이 확실하고 성깔도 있는 편입니다. 씀씀이가 강하고 돈이 잘나갑니다. 그리고 남편복이 약합니다. 쓸데없는 남자들이 많이 붙기도 합니다. 대인관계가 원활하지만 자기와 비슷한 부류의 사람들과 친하려는 성향이 강합니다. 속이 좁을수가 있고 바람끼가 약간 있습니다. 직업운이 강하며 말년운이 무난합니다. 고집과 자존심이 상하다고 할 수 있습니다.  하지만 당신은 왕이 될 상이 아닙니다.";
				break;
			case "대인관계좋음":
				titleMessage = "대인관계가 좋소!"
				resultMessage = "남편을 쥐락펴락 할 수 있으며 자상하고 재복이 좋습니다. 성격이 강직하고 자존심이 강하며 뚝심이 있습니다. 속마음을 잘 말하지 않으며 고집이 강할 수 있습니다. 말년운이 좋고 사회성, 붙임성도 좋아 대인관계에 좋은 성격입니다. 하지만 당신은 왕이 될 상이 아닙니다.";
				break;
			case "자기과시형":
				titleMessage = "자기 과시욕이 강합니다요!"
				resultMessage = "대인관계가 좋고 인복도 좋습니다. 기가 강한편이라 결혼운이 순탄하지 않을 수 있습니다. 화개살이 강하며 남자가 엄청 많이 붙을 수 있습니다. 남자를 조심해야 합니다. 집안일보다 바깥일을 중요시 하며 항상 자기 과시욕이 강하기 때문에 이쁘게 치장하고 밖에서 일하는것을 좋아합니다. 나이를 먹으면서 가정에 충실해집니다. 늦게 결혼하는게 좋습니다. 결혼운만 조심하면 아주 훌륭한 관상입니다. 하지만 당신은 왕이 될 상이 아닙니다.";
				break;
			case "재복좋음":
				titleMessage = "재복이 좋소이다!"
				resultMessage = "인복과 재복이 따르며 지혜를 겸비하고 현모양처가 될 수 있습니다. 성격이 시원시원한 관상입니다. 하지만 당신은 왕이 될 상이 아닙니다.";
				break;
			case "자수성가":
				titleMessage = "자수성가 하시겠소!"
				resultMessage = "천천히 가고 느긋하게 나아가는 것이 필요한데 성격이 급합니다. 가끔은 한발 물러나서 생각하고 이해하는 여유가 필요합니다. 재물이 모아지지 않고 빠져나갈 수 있으니 주의가 필요합니다. 실속이 없고 예민한 편입니다.. 고집이 강하며 융통성이 부족합니다. 하지만 자수성가해서 스스로의 힘으로 성공할 수 있는 의지가 강한 눈빛입니다. 하지만 당신은 왕이 될 상이 아닙니다.";
				break;
			case "야무진성품":
				titleMessage = "야무진 분이시구려!"
				resultMessage = "재물 주머니가 두둑하게 채워질 관상입니다. 노력한 만큼의 성과가 돈으로 나타날 것입니다. 긍적적인 심성을 지녔으며 나이 들수록 잘 풀리는 관상입니다. 일을 하기전에 야무지게 준비하는 성품이며 잔머리를 쓰지 않습니다. 하지만 사회생활을 위해서는 어느 정도 머리를 쓰게 될 것입니다. 결혼을 하면 자식은 물론 남편도 알뜰히 챙기게 됩니다. 자신의 몸음 힘들더라도 즐겁게 해냅니다. 남편은 사업가 아니면 전문직으로 수준있는 직업과 인연이 많을 것입니다. 귀하게 될 자식을 낳을 가능성이 높습니다. 하지만 당신은 왕이 될 상이 아닙니다.";
				break;
			case "나이많은배우자":
				titleMessage = "배우자 나이는 많으면 좋소!"
				resultMessage = "논리적이고 사고력과 판단력이 신속하고 빠르고 사회성도 좋아 재치가 뛰어 납니다. 결혼운은 무난한 편이나 남편과의 사랑은 깨소금 떨어지는 그런 부부 운은 아닙니다. 그냥 무덤덤한 부부사이가 될 수 있습니다. 결혼하면 내조를 잘하며 남편과 자식 뒤바라지를 잘하는 상입니다. 성격이 시원스럽고 밝으며 겸손하고 자상한면과 도도한 면이 복합적입니다. 중요한 것은 아무남자나 만나서 결혼해도 결혼운이 무난하고 잘 살아가는 것은 아닙니다. 인정이 많고 자상한 스타일입니다. 성실하고 부지런하여 직업운이 좋으며 활동적이고 활력이 넘칩니다. 똘끼가 있을 수 있습니다. 전체적으로 낙천적이고 무덤덤한 면과 배짱이 두둑한 관상입니다. 배우자감은 나이 많은 배우자를 만날 가능성이 높습니다. 하지만 당신은 왕이 될 상이 아닙니다.";
				break;
			default:
				titleMessage = "왕이다!"
				resultMessage = "오오 왕이 될 상이오!"
		}
		$('.title-message').html(titleMessage);
		$('.result-message').html(resultMessage);
		/*for (let i = 0; i < maxPredictions; i++) {
			const classPrediction =
				prediction[i].className + ": " + prediction[i].probability.toFixed(2);
			labelContainer.childNodes[i].innerHTML = classPrediction;
		}*/
	}