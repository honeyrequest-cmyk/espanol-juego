// 문장 데이터 — 한 줄에 하나: 단계|한국어|스페인어|다른 정답(;로 구분)|팁
// 단계 1 = 교재 수준, 2 = 조금 더 활용. ( ) 안 단어는 생략해도 정답 (예: (Yo) soy coreano.)
// 새 문장은 각 과 맨 아래에 이어서 추가하기 (중간에 끼우면 오답 기록 번호가 밀림)
const LESSONS = {
  1: { title: '1과 ¡Hola! ¿Qué tal?', sub: '인사 · 이름 · 국적 · 직업 · ser',
       grammar: '인사, 이름 묻고 답하기(llamarse: me llamo, te llamas, se llama), 국적·출신(ser de), 직업, 명사의 성과 수, ser 동사(soy, eres, es, somos, sois, son), hablar 현재형, trabajar en' },
  2: { title: '2과 ¿Cómo eres?', sub: '외모 · 성격 · 색 · 나이 · tener',
       grammar: '정관사·부정관사(el/la/los/las, un/una/unos/unas), 외모·성격·색 형용사와 성·수 일치, 숫자 0~100, tener 동사(tengo, tienes, tiene, tenemos, tenéis, tienen), 나이(Tengo ~ años), tener los ojos/el pelo ~' },
  3: { title: '3과 ¿Dónde estás?', sub: '물건 · 집 · 위치 · hay / estar · 상태',
       grammar: 'hay(처음 말하는 것의 존재) vs estar(아는 것의 위치), 위치 표현(al lado de, cerca de, lejos de, encima de, debajo de, delante de, detrás de, dentro de, entre A y B, enfrente de, a la derecha/izquierda de), de+el=del, estar 변화(estoy, estás, está, estamos, estáis, están), estar+상태 형용사, tener+hambre/sed/frío/calor/sueño/prisa/miedo, ser vs estar' }
};

const SENT_RAW = {
1: `
1|안녕하세요, 좋은 아침이에요.|Hola, buenos días.||
1|좋은 오후예요. 어떻게 지내세요?|Buenas tardes. ¿Cómo está usted?|Buenas tardes. ¿Cómo está?|usted에게는 está
1|너 어떻게 지내?|¿Cómo estás?|¿Qué tal?;¿Cómo estás tú?|
1|아주 잘 지내, 고마워.|Muy bien, gracias.||
1|그럭저럭 지내.|Regular.|Así, así.;Así así.|
1|내 이름은 민지야.|Me llamo Minji.|Mi nombre es Minji.;Soy Minji.|
1|너는 이름이 뭐니?|¿Cómo te llamas?|¿Cuál es tu nombre?;¿Cómo te llamas tú?|
1|성함이 어떻게 되세요?|¿Cómo se llama usted?|¿Cómo se llama?;¿Cuál es su nombre?|usted → se llama
1|제 성은 김이에요.|Mi apellido es Kim.||
1|만나서 반가워요.|Mucho gusto.|Encantado.;Encantada.|
1|나는 한국 사람이야. (남)|(Yo) soy coreano.|(Yo) soy surcoreano.|
1|나는 한국 사람이야. (여)|(Yo) soy coreana.|(Yo) soy surcoreana.|
1|너는 어디 출신이야?|¿De dónde eres?|¿De dónde eres tú?|
1|나는 서울 출신이야.|(Yo) soy de Seúl.||
1|그녀는 스페인 사람이에요.|(Ella) es española.||
1|그들은 멕시코 사람이에요.|(Ellos) son mexicanos.||
1|우리는 한국 사람이에요. (남)|(Nosotros) somos coreanos.||
1|너는 무슨 일을 하니?|¿A qué te dedicas?||
1|나는 선생님이야. (여)|(Yo) soy profesora.||직업 앞에는 관사 없이
1|나는 의사야. (남)|(Yo) soy médico.||
1|이 사람은 카를로스예요.|Este es Carlos.||남자 소개 Este es, 여자 소개 Esta es
1|이 사람은 내 친구 아나예요.|Esta es mi amiga Ana.||
1|다시 한 번 부탁합니다.|Otra vez, por favor.||
1|좀 더 천천히 부탁합니다.|Más despacio, por favor.||
1|그거 어떻게 써요?|¿Cómo se escribe?||
1|대단히 감사합니다.|Muchas gracias.||
1|내일 봐!|¡Hasta mañana!||
1|다음에 봐!|¡Hasta luego!|¡Hasta pronto!|
2|나는 한국 사람이고 영어 선생님이야. (여)|(Yo) soy coreana y soy profesora de inglés.|(Yo) soy coreana y profesora de inglés.|
2|그는 아르헨티나 사람이고 요리사예요.|(Él) es argentino y es cocinero.|(Él) es argentino y cocinero.;(Él) es de Argentina y es cocinero.|
2|당신은 어디에서 일하세요?|¿Dónde trabaja usted?|¿Dónde trabaja?|
2|나는 병원에서 일해.|(Yo) trabajo en un hospital.|(Yo) trabajo en el hospital.|
2|내 여동생은 약국에서 일해요.|Mi hermana trabaja en una farmacia.|Mi hermana trabaja en la farmacia.|
2|너는 영어 할 줄 알아?|¿Hablas inglés?|¿Hablas inglés tú?;¿Tú hablas inglés?|
2|나는 한국어와 영어를 해.|(Yo) hablo coreano e inglés.||i 소리 앞에서는 y 대신 e
2|우리는 스페인어를 조금 해요.|(Nosotros) hablamos un poco de español.|(Nosotros) hablamos un poco español.|
2|그녀의 이름은 루시아이고 기자예요.|Se llama Lucía y es periodista.|Su nombre es Lucía y es periodista.|
2|카를로스와 나는 반 친구예요.|Carlos y yo somos compañeros de clase.||
2|너희들은 학생이니?|¿Sois estudiantes?|¿Vosotros sois estudiantes?;¿Ustedes son estudiantes?;¿Vosotras sois estudiantes?|
2|우리 엄마는 간호사이고 아빠는 경찰관이에요.|Mi madre es enfermera y mi padre es policía.||
2|그들은 프랑스 출신이 아니에요. 이탈리아 출신이에요.|(Ellos) no son de Francia. Son de Italia.|(Ellos) no son de Francia, son de Italia.;(Ellos) no son franceses. Son italianos.|
2|나는 기자가 아니야. 작가야. (남)|(Yo) no soy periodista. Soy escritor.|(Yo) no soy periodista, soy escritor.|no는 동사 바로 앞
2|선생님이세요? — 아니요, 저는 학생이에요. (남자에게)|¿Es usted profesor? No, soy estudiante.|¿Usted es profesor? No, soy estudiante.;¿Es profesor? No, soy estudiante.|
2|제 이름은 김민지이고, 한국에서 왔어요.|Me llamo Minji Kim y soy de Corea.|Mi nombre es Minji Kim y soy de Corea.;Me llamo Kim Minji y soy de Corea.|
2|이 사람은 내 가장 친한 친구야. 일본 사람이야. (친구가 여자)|Esta es mi mejor amiga. Es japonesa.||
2|그는 산업 디자이너이고 회사에서 일해요.|(Él) es diseñador industrial y trabaja en una empresa.||
2|저희는 캐나다 출신이 아니라 미국 출신이에요.|No somos de Canadá, somos de Estados Unidos.|No somos de Canadá. Somos de Estados Unidos.|
2|당신은 무슨 일을 하세요?|¿A qué se dedica usted?|¿A qué se dedica?|
2|나는 학교에서 일하고 스페인어를 공부해.|(Yo) trabajo en una escuela y estudio español.|(Yo) trabajo en la escuela y estudio español.|estudiar = 공부하다 (규칙 동사 hablar와 같은 모양)
2|안녕히 주무세요. 내일 봐요!|Buenas noches. ¡Hasta mañana!||
2|이 사람은 내 애인이에요. (여자 친구)|Esta es mi novia.||애인은 novio/novia, 그냥 친구는 amigo/amiga
2|아나는 내 애인이 아니라 그냥 친구야.|Ana no es mi novia, es mi amiga.|Ana no es mi novia. Es mi amiga.|novia = 애인, amiga = 친구
2|카를로스는 내 애인이에요. (남자 친구)|Carlos es mi novio.||
2|카를로스는 그냥 친구예요. 애인이 아니에요.|Carlos es solo un amigo. No es mi novio.|Carlos es solo mi amigo. No es mi novio.;Carlos solo es un amigo. No es mi novio.;Carlos es solo un amigo, no es mi novio.|solo = 단지, 그냥
`,
2: `
1|너는 어떤 사람이야?|¿Cómo eres?|¿Cómo eres tú?|
1|나는 키가 커. (남)|(Yo) soy alto.||
1|그녀는 키가 작고 날씬해요.|(Ella) es baja y delgada.||
1|그는 금발이고 잘생겼어요.|(Él) es rubio y guapo.||
1|우리 엄마는 친절해요.|Mi madre es amable.||-e로 끝나는 형용사는 남녀 같음
1|내 친구들은 재미있어요.|Mis amigos son divertidos.||
1|너는 아주 똑똑해.|(Tú) eres muy inteligente.||
1|나는 조금 소심해. (여)|(Yo) soy un poco tímida.||
1|후안은 게으르지 않아요.|Juan no es perezoso.||
1|너 몇 살이야?|¿Cuántos años tienes?|¿Cuántos años tienes tú?|
1|나는 서른 살이야.|(Yo) tengo treinta años.||나이는 ser가 아니라 tener
1|그녀는 스물다섯 살이에요.|(Ella) tiene veinticinco años.||
1|나는 남동생이 한 명 있어.|(Yo) tengo un hermano.|(Yo) tengo un hermano menor.|
1|하늘은 파란색이에요.|El cielo es azul.||
1|사과는 빨간색이에요.|La manzana es roja.||
1|그건 무슨 색이에요?|¿De qué color es?||
1|그는 머리가 짧아요.|(Él) es de pelo corto.|(Él) tiene el pelo corto.|
1|그녀는 긴 곱슬머리예요.|(Ella) es de pelo largo y rizado.|(Ella) tiene el pelo largo y rizado.|
1|그 여자는 젊고 예뻐요.|La mujer es joven y bonita.|La mujer es joven y guapa.|
1|그 남자는 나이가 많아요.|El hombre es mayor.||
1|별들은 노란색이에요.|Las estrellas son amarillas.||복수 명사 → 형용사도 복수
1|나는 키가 중간이야.|(Yo) soy de estatura mediana.||
2|나의 가장 친한 친구는 키가 크고 아주 상냥해. (친구가 남자)|Mi mejor amigo es alto y muy simpático.||
2|내 여동생은 키가 작지만 운동을 아주 잘해.|Mi hermana es baja, pero es muy atlética.|Mi hermana es baja, pero muy atlética.|pero = 하지만
2|우리 선생님은 진지하지만 웃겨요. (남)|Mi profesor es serio, pero cómico.|Nuestro profesor es serio, pero cómico.;Mi profesor es serio, pero es cómico.|
2|너는 낙천적이니, 비관적이니?|¿Eres optimista o pesimista?||-ista로 끝나는 형용사는 남녀 같음
2|나는 낙천적이고 열정적이야.|(Yo) soy optimista y entusiasta.||
2|그들은 친절하고 열심히 일해요.|(Ellos) son amables y trabajadores.||
2|그녀들은 말이 없고 진지해요.|(Ellas) son calladas y serias.||
2|우리 아빠는 쉰 살이고 키가 중간이에요.|Mi padre tiene cincuenta años y es de estatura mediana.||
2|나는 형제가 둘 있어. 둘 다 키가 커.|(Yo) tengo dos hermanos. Los dos son altos.|(Yo) tengo dos hermanos y los dos son altos.|
2|너는 애완동물 있어?|¿Tienes una mascota?|¿Tienes mascota?;¿Tienes una mascota tú?|
2|나는 개가 한 마리 있어. 크고 갈색이야.|(Yo) tengo un perro. Es grande y marrón.|(Yo) tengo un perro. Es grande y de color café.|
2|내 친구들은 웃기지만 조금 게을러요.|Mis amigos son cómicos, pero un poco perezosos.|Mis amigos son cómicos, pero son un poco perezosos.|
2|그녀는 금발이고 눈이 파래요.|(Ella) es rubia y tiene los ojos azules.||눈·머리 색은 tener los ojos / el pelo
2|나는 눈이 갈색이고 생머리야.|(Yo) tengo los ojos marrones y el pelo liso.|(Yo) tengo los ojos de color café y el pelo liso.|
2|네 남동생은 몇 살이야?|¿Cuántos años tiene tu hermano?||
2|당신은 몇 살이세요?|¿Cuántos años tiene usted?|¿Cuántos años tiene?|
2|우리는 둘 다 스물아홉 살이에요. (여자 둘)|Las dos tenemos veintinueve años.||
2|그는 이기적이지 않아요. 아주 친절해요.|(Él) no es egoísta. Es muy amable.|(Él) no es egoísta, es muy amable.|
2|무지개는 일곱 가지 색이 있어요.|El arcoíris tiene siete colores.||
2|우리 할머니는 나이가 많지만 아주 열정적이에요.|Mi abuela es mayor, pero es muy entusiasta.|Mi abuela es mayor, pero muy entusiasta.|abuela = 할머니
2|내가 가장 좋아하는 색은 초록색이야.|Mi color favorito es el verde.|Mi color favorito es verde.|
2|그 가수는 재능이 많고 아주 솔직해요. (여)|La cantante es talentosa y muy sincera.||
2|너희들은 착하고 똑똑해. (남)|(Vosotros) sois simpáticos e inteligentes.|(Ustedes) son simpáticos e inteligentes.|i 소리 앞에서는 y 대신 e
2|나는 언니가 한 명, 남동생이 두 명 있어.|(Yo) tengo una hermana y dos hermanos.||
2|달은 하얗고 해는 노래요.|La luna es blanca y el sol es amarillo.||
`,
3: `
1|강의실에 뭐가 있어?|¿Qué hay en el aula?|¿Qué hay en la clase?|el aula는 여성 명사지만 el
1|책상과 의자가 있어요.|Hay pupitres y sillas.|Hay escritorios y sillas.|
1|탁자 위에 책이 두 권 있어.|En la mesa hay dos libros.|Hay dos libros en la mesa.;Hay dos libros encima de la mesa.;Encima de la mesa hay dos libros.;Sobre la mesa hay dos libros.|처음 말하는 것 → hay
1|화장실은 어디에 있어요?|¿Dónde está el baño?|¿Dónde están los baños?|아는 것의 위치 → estar
1|이 근처에 현금 지급기가 있나요?|¿Hay un cajero automático por aquí?|¿Hay un cajero por aquí?|
1|은행은 공원 옆에 있어요.|El banco está al lado del parque.||de + el = del
1|우체국은 여기서 멀지 않아요.|La oficina de correos no está lejos de aquí.|Correos no está lejos de aquí.|
1|버스 정거장은 가까워요.|La parada de autobuses está cerca.|La parada de autobús está cerca.|
1|개는 침대 아래에 있어.|El perro está debajo de la cama.||
1|램프는 책상 위에 있어요.|La lámpara está encima del escritorio.|La lámpara está sobre el escritorio.;La lámpara está en el escritorio.|
1|나는 피곤해. (남)|(Yo) estoy cansado.||
1|그녀는 오늘 슬퍼요.|(Ella) está triste hoy.|Hoy (ella) está triste.|
1|나는 무척 배고파.|(Yo) tengo mucha hambre.||배고픔은 estar가 아니라 tener hambre
1|너 목말라?|¿Tienes sed?|¿Tienes sed tú?|
1|우리는 바빠요. (남)|(Nosotros) estamos ocupados.||
1|마드리드는 스페인 중앙에 있어요.|Madrid está en el centro de España.||
1|창문이 열려 있어요.|La ventana está abierta.||
1|텔레비전이 꺼져 있어요.|El televisor está apagado.|La televisión está apagada.|
1|방이 깨끗해요.|La habitación está limpia.|El dormitorio está limpio.|지금 상태 → estar
1|너 어디 있어?|¿Dónde estás?|¿Dónde estás tú?|
1|나는 집에 있어.|(Yo) estoy en casa.||
1|의자는 책상 앞에 있어.|La silla está delante del escritorio.|La silla está delante de la mesa.|
2|우리 동네에는 큰 공원과 슈퍼마켓이 있어.|En mi barrio hay un parque grande y un supermercado.|Hay un parque grande y un supermercado en mi barrio.|
2|슈퍼마켓은 은행과 약국 사이에 있어요.|El supermercado está entre el banco y la farmacia.||entre A y B
2|실례합니다, 지하철역 입구가 어디에 있나요?|Perdone, ¿dónde está la boca de metro?|Perdón, ¿dónde está la boca de metro?|모르는 사람에게 Perdone (usted)
2|약국은 병원 맞은편에 있어요.|La farmacia está enfrente del hospital.|La farmacia está frente al hospital.|a + el = al
2|내 방에는 침대, 옷장, 그리고 책장이 있어.|En mi habitación hay una cama, un armario y una estantería.|En mi dormitorio hay una cama, un armario y una estantería.;Hay una cama, un armario y una estantería en mi habitación.|
2|책장은 옷장 오른쪽에 있어요.|La estantería está a la derecha del armario.||
2|양탄자는 방 한가운데에 있어요.|La alfombra está en el centro de la habitación.|La alfombra está en el centro del dormitorio.|
2|내 가방은 의자 위에 없어. 문 뒤에 있어.|Mi mochila no está en la silla. Está detrás de la puerta.|Mi mochila no está encima de la silla. Está detrás de la puerta.;Mi mochila no está sobre la silla, está detrás de la puerta.;Mi mochila no está en la silla, está detrás de la puerta.|
2|우리 부모님은 지금 마드리드에 계세요.|Mis padres están en Madrid ahora.|Mis padres ahora están en Madrid.;Ahora mis padres están en Madrid.|
2|수프가 식었어요.|La sopa está fría.||원래 차가운 게 아니라 지금 상태 → estar
2|후안은 선생님이고 오늘은 무척 바빠요.|Juan es profesor y hoy está muy ocupado.||직업 ser, 오늘 상태 estar
2|카르멘은 원래 명랑한데, 오늘은 기분이 나빠요.|Carmen es alegre, pero hoy está de mal humor.||
2|나는 오늘 너무 피곤하고 졸려. (여)|Hoy estoy muy cansada y tengo mucho sueño.|(Yo) estoy muy cansada y tengo mucho sueño hoy.|
2|시험이 내일이라 긴장돼. (남)|El examen es mañana y estoy nervioso.||
2|우리는 피곤하지 않아. 아주 편안해. (남)|No estamos cansados. Estamos muy relajados.|No estamos cansados, estamos muy relajados.|
2|이 근처에 피자 가게 있나요? — 네, 영화관 옆에 하나 있어요.|¿Hay una pizzería por aquí? Sí, hay una al lado del cine.||
2|해변은 호텔에서 가까워요?|¿La playa está cerca del hotel?|¿Está la playa cerca del hotel?;¿Está cerca del hotel la playa?|
2|나는 무척 더워. 창문 열려 있어?|(Yo) tengo mucho calor. ¿La ventana está abierta?|Tengo mucho calor. ¿Está abierta la ventana?|
2|내 휴대폰 어디 있지? 아, 가방 안에 있어.|¿Dónde está mi móvil? Ah, está dentro de la mochila.|¿Dónde está mi móvil? Ah, está en la mochila.;¿Dónde está mi celular? Ah, está dentro de la mochila.|
2|선물 가게는 꽃집과 문구점 사이에 있어요.|La tienda de regalos está entre la florería y la papelería.||
2|우리 집은 크지 않지만 작지도 않아요.|Mi casa no es grande, pero tampoco es pequeña.||tampoco = ~도 아니다 (교재 모델 글)
2|부엌은 거실 옆에 있고, 욕실은 복도 끝에 있어요.|La cocina está al lado del salón y el baño está al final del pasillo.|La cocina está al lado del salón y el baño está al fondo del pasillo.|pasillo = 복도
2|너희 학교 근처에 도서관 있어?|¿Hay una biblioteca cerca de tu escuela?|¿Hay una biblioteca cerca de tu colegio?|
2|나는 배고프지 않아. 그런데 아주 목말라.|No tengo hambre, pero tengo mucha sed.|(Yo) no tengo hambre, pero tengo mucha sed.|
2|그 아이들은 소파에 앉아 있어요.|Los niños están sentados en el sofá.||niños = 아이들
2|우리 선생님은 오늘 아파요. 집에 계세요. (여)|Mi profesora está enferma hoy. Está en casa.|Nuestra profesora está enferma hoy. Está en casa.;Hoy mi profesora está enferma. Está en casa.|
`
};

// 바꿔 말하기: 과|기본 문장|바꿀 조건|정답|다른 정답(;)|팁
const DRILL_RAW = `
1|(Yo) soy coreano.|그녀|(Ella) es coreana.|
1|(Yo) soy coreano.|우리 (남)|(Nosotros) somos coreanos.|
1|(Yo) soy coreano.|너희들 (여)|(Vosotras) sois coreanas.|(Ustedes) son coreanas.
1|(Ella) es médica.|그|(Él) es médico.|
1|(Ella) es médica.|그들|(Ellos) son médicos.|
1|(Yo) soy de España.|우리|(Nosotros) somos de España.|(Nosotras) somos de España.
1|(Él) es profesor.|그녀들|(Ellas) son profesoras.|
1|Mi padre es cocinero.|우리 엄마|Mi madre es cocinera.|
1|(Yo) soy alemán.|그녀|(Ella) es alemana.|
1|(Él) es francés.|그들|(Ellos) son franceses.|
1|(Ella) es japonesa.|그녀들|(Ellas) son japonesas.|
1|(Tú) hablas español.|우리|(Nosotros) hablamos español.|(Nosotras) hablamos español.
1|(Tú) hablas español.|그녀|(Ella) habla español.|
1|(Yo) me llamo Ana.|그 / Luis|(Él) se llama Luis.|
1|(Yo) me llamo Ana.|너 / Pablo|(Tú) te llamas Pablo.|
1|¿De dónde eres?|usted에게|¿De dónde es usted?|¿De dónde es?
1|(Yo) trabajo en un hospital.|그녀 / 약국|(Ella) trabaja en una farmacia.|(Ella) trabaja en la farmacia.
1|Este es mi amigo.|친구가 여자일 때 (애인 아님)|Esta es mi amiga.|
2|(Él) es alto.|그녀들|(Ellas) son altas.|
2|Mi hermano es simpático.|내 여동생|Mi hermana es simpática.|
2|(Yo) tengo veinte años.|그녀|(Ella) tiene veinte años.|
2|(Yo) tengo veinte años.|우리|(Nosotros) tenemos veinte años.|(Nosotras) tenemos veinte años.
2|El perro es negro.|복수로|Los perros son negros.|
2|La casa es blanca.|복수로|Las casas son blancas.|
2|(Ella) es inteligente.|그들|(Ellos) son inteligentes.|
2|(Él) es trabajador.|그녀|(Ella) es trabajadora.|
2|(Yo) tengo un hermano.|너|(Tú) tienes un hermano.|
2|(Yo) tengo un hermano.|그들|(Ellos) tienen un hermano.|
2|un libro|복수로|unos libros|
2|la silla|복수로|las sillas|
2|el lápiz|복수로|los lápices||z로 끝나면 z → ces
2|La flor es roja.|복수로|Las flores son rojas.|
2|(Ella) es optimista.|그들|(Ellos) son optimistas.|
2|(Tú) eres tímido.|너희들 (남)|(Vosotros) sois tímidos.|(Ustedes) son tímidos.
2|¿Cuántos años tienes?|usted에게|¿Cuántos años tiene usted?|¿Cuántos años tiene?
2|(Él) es alto y rubio.|반대로 (작고 갈색 피부)|(Él) es bajo y moreno.|
3|(Yo) estoy cansado.|그녀|(Ella) está cansada.|
3|(Yo) estoy cansado.|우리 (여)|(Nosotras) estamos cansadas.|
3|El libro está en la mesa.|책들|Los libros están en la mesa.|
3|Hay un parque.|공원 두 개|Hay dos parques.|
3|El banco está cerca.|반대로|El banco está lejos.|
3|La silla está delante de la mesa.|반대로|La silla está detrás de la mesa.|
3|El perro está encima de la cama.|반대로|El perro está debajo de la cama.|
3|(Yo) tengo frío.|그 / 덥다|(Él) tiene calor.|
3|(Tú) estás triste.|너희들 (남)|(Vosotros) estáis tristes.|(Ustedes) están tristes.
3|La ventana está abierta.|창문들|Las ventanas están abiertas.|
3|Carmen es alegre.|지금 상태로|Ahora Carmen está alegre.|Carmen está alegre ahora.
3|El baño está al lado del dormitorio.|부엌 / 거실|La cocina está al lado del salón.|
3|(Yo) estoy en casa.|그들 / 공원|(Ellos) están en el parque.|
3|¿Dónde está el baño?|화장실들|¿Dónde están los baños?|
3|Hay una farmacia aquí.|질문으로 / 이 근처|¿Hay una farmacia por aquí?|
3|(Ella) tiene hambre.|나 / 무척|(Yo) tengo mucha hambre.|
3|El parque está cerca de la escuela.|은행 / 병원 옆|El banco está al lado del hospital.|
3|La televisión está apagada.|컴퓨터|El ordenador está apagado.|La computadora está apagada.
1|Este es mi amigo.|친구가 아니라 애인(남)으로|Este es mi novio.|
1|Esta es mi amiga.|친구가 아니라 애인(여)으로|Esta es mi novia.|
`;
