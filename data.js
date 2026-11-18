// 문장 데이터 — 한 줄에 하나: 단계|한국어|스페인어|다른 정답(;로 구분)|팁
// 단계 1 = 교재 수준, 2 = 조금 더 활용. ( ) 안 단어는 생략해도 정답 (예: (Yo) soy coreano.)
// 새 문장은 각 과 맨 아래에 이어서 추가하기
const LESSONS = {
  0: { title: '예비과 Alfabeto', sub: '알파벳 · 발음 · 강세 · 교실 표현' },
  1: { title: '1과 ¡Hola! ¿Qué tal?', sub: '인사 · 이름 · 국적 · 직업 · ser' },
  2: { title: '2과 ¿Cómo eres?', sub: '외모 · 성격 · 색 · 나이 · tener' },
  3: { title: '3과 ¿Dónde estás?', sub: '물건 · 집 · 위치 · hay / estar · 상태' },
  4: { title: '4과 ¿Qué clases tomas?', sub: '수업 · 빈도 · 요일 · 현재형 규칙 동사 · 소유사 · 의문사' },
  5: { title: '5과 ¿Cuánto cuesta?', sub: '가격 · 숫자 100~ · 지시사 · 옷 · muy/mucho · ir a' },
  6: { title: '6과 ¿Cómo es tu familia?', sub: '가족 · gustar · 식당 · 어간 변화 동사 · me/te/le' },
  7: { title: '7과 ¿Qué tiempo hace hoy?', sub: '날짜 · 날씨 · 집안일 · tener que · yo 불규칙 · lo/la' },
  8: { title: '8과 ¿A qué hora te levantas?', sub: '시각 · tardar/durar · 재귀동사 · 서로 ~하다' },
  9: { title: '9과 ¿Quién es tu jugador favorito?', sub: '예술 · 취미 · 교통 · 부정어 · 대명사 두 개 · saber/conocer' }
};

const SENT_RAW = {
0: `
1|안녕!|¡Hola!||
1|좋은 아침이에요.|Buenos días.||
1|고마워요.|Gracias.|Muchas gracias.|
1|천만에요.|De nada.||
1|죄송해요.|Perdón.|Perdone.;Lo siento.|
1|이름이 뭐야?|¿Cómo te llamas?||
1|내 이름은 루시아야.|Me llamo Lucía.||
1|어떻게 써요?|¿Cómo se escribe?||
1|커피 한 잔 주세요.|Un café, por favor.||
1|오렌지 주스 한 잔 주세요.|Un zumo de naranja, por favor.||
1|물 주세요.|Agua, por favor.||
1|계산서 주세요.|La cuenta, por favor.||
1|아니요, 괜찮아요.|No, gracias.||
1|이해가 안 돼요.|No entiendo.|(Yo) no entiendo.|
1|좀 더 천천히 말해 주세요.|Más despacio, por favor.||
1|한 번 더 해 주세요.|Otra vez, por favor.||
1|내일 봐요.|Hasta mañana.||
1|안녕히 가세요.|Adiós.||
`,
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
`,
4: `
1|이번 학기에 수업 몇 개 들어?|¿Cuántas clases tomas este semestre?||
1|네 과목 들어.|Tomo cuatro clases.|Tomo cuatro.|
1|스페인어는 누가 가르쳐?|¿Quién enseña español?||
1|너는 밖에서 자주 먹어?|¿Comes a menudo fuera de casa?||
1|나는 꽤 바쁘게 살아.|(Yo) llevo una vida bastante ocupada.||
1|우리 엄마는 요리를 아주 잘하셔.|Mi mamá cocina muy bien.|Mi madre cocina muy bien.|
1|나는 밖에서 절대 안 먹어.|Nunca como fuera de casa.|No como nunca fuera de casa.|
1|나는 토요일마다 스페인어를 공부해.|(Yo) estudio español los sábados.||los sábados = 토요일마다
1|너는 아침에 커피 마셔?|¿Bebes café por la mañana?|¿Tú bebes café por la mañana?|
1|우리 아빠는 신문을 읽으셔.|Mi padre lee el periódico.||
1|우리는 서울에 살아.|(Nosotros) vivimos en Seúl.||
1|너희는 집에서 먹니?|¿Coméis en casa?|¿Vosotros coméis en casa?|
1|그들은 이메일을 많이 써.|(Ellos) escriben muchos correos.||
1|당신은 스페인어를 아주 잘하시네요.|(Usted) habla muy bien español.|(Usted) habla español muy bien.|
1|내 친구들은 살사 춤을 배워. (친구들이 여자)|Mis amigas aprenden a bailar salsa.||
1|한 사람은 기타를 쳐요.|Una persona toca la guitarra.||
1|크리스티나는 콜라를 마셔요.|Cristina bebe una Coca-Cola.||
1|나는 3층에 살아.|Vivo en el tercer piso.||tercero → 남성 단수 명사 앞에서 tercer
1|두 번째 과예요.|Es la segunda lección.||
1|오늘이 내 첫날이야.|Es mi primer día.|Hoy es mi primer día.|
1|너는 어디에서 일해?|¿Dónde trabajas?||
1|뭘 읽어?|¿Qué lees?||
1|어디 살아? — 서울에 살아.|¿Dónde vives? — Vivo en Seúl.||
1|어디 가? — 도서관에 가.|¿Adónde vas? — Voy a la biblioteca.||
1|파티는 언제야? — 금요일이야.|¿Cuándo es la fiesta? — Es el viernes.|¿Cuándo es la fiesta? — El viernes.|
1|네 휴대폰 번호는 뭐야?|¿Cuál es tu número de móvil?||
2|나는 서울에 살고 은행에서 일해.|Vivo en Seúl y trabajo en un banco.||
2|우리 부모님은 부산에 사시고, 나는 서울에서 여동생이랑 살아.|Mis padres viven en Busan y yo vivo en Seúl con mi hermana.||
2|나는 매일 아침 커피를 마시지만, 차는 절대 안 마셔.|Bebo café todas las mañanas, pero nunca bebo té.||
2|왜 스페인어를 배워? — 내 애인이 스페인 사람이라서. (애인이 남자)|¿Por qué aprendes español? — Porque mi novio es español.||
2|우리 선생님은 월요일과 수요일에 문학을 가르치세요. (선생님이 남자)|Nuestro profesor enseña literatura los lunes y los miércoles.|Mi profesor enseña literatura los lunes y los miércoles.|
2|너희 수업은 언제야? — 금요일이야.|¿Cuándo es vuestra clase? — Es el viernes.||
2|나는 주말마다 친구들이랑 저녁을 먹어.|Ceno con mis amigos los fines de semana.|Los fines de semana ceno con mis amigos.|
2|너는 보통 어디에서 점심 먹어?|¿Dónde comes normalmente?|¿Normalmente dónde comes?|
2|우리는 가끔 스페인 음식을 요리해.|A veces cocinamos comida española.|Cocinamos comida española a veces.|a veces = 가끔
2|내 여동생은 대학에서 경제학을 공부해.|Mi hermana estudia economía en la universidad.||
2|너희 선생님은 어디 출신이야? (선생님이 남자)|¿De dónde es vuestro profesor?||
2|나는 매일 스페인어로 이메일을 하나 써.|Escribo un correo en español todos los días.|Todos los días escribo un correo en español.|
2|내 친구들은 바르셀로나에 살고 영어를 가르쳐.|Mis amigos viven en Barcelona y enseñan inglés.||
2|몇 층에 살아? — 5층에 살아.|¿En qué piso vives? — Vivo en el quinto piso.||
2|우리 아빠는 아침마다 신문을 읽고 커피를 마셔.|Mi padre lee el periódico y bebe café todas las mañanas.|Todas las mañanas mi padre lee el periódico y bebe café.|
2|너는 화요일과 목요일에 뭐 공부해?|¿Qué estudias los martes y los jueves?||
2|우리 부모님은 외식을 거의 안 하셔.|Mis padres casi nunca comen fuera de casa.||casi nunca = 거의 안
2|너희는 어디 살아? — 우리는 마드리드 시내에 살아.|¿Dónde vivís? — Vivimos en el centro de Madrid.||
2|그녀의 남자친구는 식당에서 일해.|Su novio trabaja en un restaurante.||
2|오늘은 내 스페인어 수업 첫날이야.|Hoy es el primer día de mi clase de español.||
2|나는 일요일엔 절대 일 안 해.|Nunca trabajo los domingos.|Los domingos nunca trabajo.;No trabajo nunca los domingos.|
2|너는 누구랑 살아? — 내 고양이랑 살아.|¿Con quién vives? — Vivo con mi gato.||
2|우리 언니는 항상 소설을 읽어.|Mi hermana siempre lee novelas.||
2|너는 몇 개 언어를 해? — 세 개 해.|¿Cuántos idiomas hablas? — Hablo tres idiomas.|¿Cuántos idiomas hablas? — Hablo tres.|
2|우리는 금요일마다 함께 살사 춤을 배워.|Los viernes aprendemos a bailar salsa juntos.|Aprendemos a bailar salsa juntos los viernes.|
2|내 친구는 대학에서 일본어를 배우고, 나는 중국어를 배워.|Mi amigo aprende japonés en la universidad y yo aprendo chino.||
`,
5: `
1|이 바나나 얼마예요?|¿Cuánto cuestan estos plátanos?||
1|1킬로에 2유로예요.|Cuesta dos euros el kilo.|Cuestan dos euros el kilo.;Dos euros el kilo.|
1|그럼 2킬로 주세요.|Pues, dos kilos, por favor.|Dos kilos, por favor.|
1|이건 뭐예요?|¿Qué es esto?||
1|이 셔츠 아주 예쁘다.|Esta camisa es muy bonita.||
1|그 부츠 얼마예요?|¿Cuánto cuestan esas botas?||
1|저 신사분은 우리 선생님이야.|Aquel señor es mi profesor.||
1|이 바지는 비싸.|Estos pantalones son caros.||
1|노란 셔츠 입은 그 신사분 누구야?|¿Quién es ese señor de camisa amarilla?||
1|그는 항상 정장을 입어.|(Él) siempre lleva traje.||llevar = (옷을) 입고 있다
1|그녀는 빨간 치마를 입고 있어.|(Ella) lleva una falda roja.||
1|이 외투는 아주 비싸.|Este abrigo es muy caro.||
1|나 무척 배고파.|Tengo mucha hambre.||muy가 아니라 mucha + 명사
1|마드리드에는 관광객이 많아.|Hay muchos turistas en Madrid.|En Madrid hay muchos turistas.|
1|우리 형은 일을 많이 해.|Mi hermano trabaja mucho.||
1|그 선생님은 아주 잘 가르쳐.|El profesor enseña muy bien.||
1|나는 티셔츠가 많아.|Tengo muchas camisetas.||
1|나는 슈퍼마켓에 가.|(Yo) voy al supermercado.||a + el = al
1|오늘 밤 파티에 가?|¿Vas a la fiesta esta noche?||
1|우리는 영화를 볼 거야.|(Nosotros) vamos a ver una película.||ir a + 동사원형 = ~할 것이다
1|이번 토요일에 뭐 할 거야?|¿Qué vas a hacer este sábado?||
1|그냥 집에 있을 것 같아.|Creo que voy a quedarme en casa.||
1|여름 내내 일할 거예요.|Voy a trabajar todo el verano.||
1|우리 부모님은 마드리드로 여행 가실 거야.|Mis padres van a viajar a Madrid.||
2|그 부츠는 아주 예쁘지만 비싸요.|Esas botas son muy bonitas, pero caras.|Esas botas son muy bonitas, pero son caras.|
2|저 여자분은 빨간 치마를 입고 있어요.|Aquella señora lleva una falda roja.||
2|이 외투는 250유로예요.|Este abrigo cuesta doscientos cincuenta euros.||
2|이번 주말에 뭐 할 거야? — 집에 있을 거야.|¿Qué vas a hacer este fin de semana? — Voy a quedarme en casa.||
2|우리 형은 일을 많이 하고, 늘 아주 피곤해.|Mi hermano trabaja mucho y siempre está muy cansado.||
2|이 셔츠 얼마예요? — 35유로예요.|¿Cuánto cuesta esta camisa? — Treinta y cinco euros.|¿Cuánto cuesta esta camisa? — Cuesta treinta y cinco euros.|
2|여름에 우리는 스페인을 여행할 거야.|En verano vamos a viajar por España.||
2|이 바지 얼마예요? — 45유로예요.|¿Cuánto cuestan estos pantalones? — Cuestan cuarenta y cinco euros.|¿Cuánto cuestan estos pantalones? — Cuarenta y cinco euros.|
2|저 파란 셔츠는 아주 싸요.|Aquella camisa azul es muy barata.||
2|이 신발은 120유로예요.|Estos zapatos cuestan ciento veinte euros.||100 = cien, 101~199 = ciento ...
2|그 검은 외투 얼마예요?|¿Cuánto cuesta ese abrigo negro?||
2|나는 오늘 오후에 옷을 살 거야.|Voy a comprar ropa esta tarde.|Esta tarde voy a comprar ropa.|
2|내일 우리는 시장에 갈 거야.|Mañana vamos a ir al mercado.|Mañana vamos al mercado.|
2|이 가방은 너무 비싸요. 저건 얼마예요?|Este bolso es muy caro. ¿Cuánto cuesta aquel?||
2|사과는 1킬로에 3유로예요.|Las manzanas cuestan tres euros el kilo.|El kilo de manzanas cuesta tres euros.|
2|내 친구는 늘 하얀 티셔츠를 입어.|Mi amigo siempre lleva una camiseta blanca.||
2|마드리드에는 박물관이 많아.|En Madrid hay muchos museos.|Hay muchos museos en Madrid.|
2|나는 오늘 무척 피곤해서 집에 있을 거야. (남)|Hoy estoy muy cansado y voy a quedarme en casa.||
2|이번 여름에 뭐 할 거야? — 스페인어를 공부할 거야.|¿Qué vas a hacer este verano? — Voy a estudiar español.||
2|이 호텔은 1박에 200유로예요.|Este hotel cuesta doscientos euros por noche.||
2|나는 목이 무척 말라.|Tengo mucha sed.||muy가 아니라 mucha + 명사
2|우리는 스페인에서 사진을 많이 찍을 거야.|Vamos a sacar muchas fotos en España.|En España vamos a sacar muchas fotos.;Vamos a hacer muchas fotos en España.|
2|이 노란 원피스 얼마예요?|¿Cuánto cuesta este vestido amarillo?||
2|이 엽서 다섯 장에 얼마예요?|¿Cuánto cuestan estas cinco postales?||
2|그 빨간 바지는 아주 예쁘고 싸요.|Esos pantalones rojos son muy bonitos y baratos.||
2|우리 엄마는 신발이 많아.|Mi madre tiene muchos zapatos.|Mi mamá tiene muchos zapatos.|
2|내일 우리는 박물관에 가고, 밤에는 플라멩코를 볼 거야.|Mañana vamos a ir al museo y por la noche vamos a ver flamenco.||
`,
6: `
1|형제 있어?|¿Tienes hermanos?||
1|남자 형제 하나, 여자 형제 하나 있어.|Tengo un hermano y una hermana.||
1|우리 형은 나보다 나이가 많아.|Mi hermano es mayor que yo.||
1|우리 형은 결혼했어.|Mi hermano está casado.||
1|미겔은 우리 아빠야.|Miguel es mi padre.||
1|마리아는 우리 할머니야.|María es mi abuela.||
1|후안과 파울라는 내 아이들이야.|Juan y Paula son mis hijos.||
1|이사벨과 나는 나이가 같아.|Isabel y yo tenemos la misma edad.||
1|나는 스페인 영화를 좋아해.|Me gusta el cine español.|A mí me gusta el cine español.|
1|너는 스페인 노래들 좋아해?|¿Te gustan las canciones españolas?|¿A ti te gustan las canciones españolas?|복수 명사 → gustan
1|우리는 노래하고 춤추는 걸 좋아해.|Nos gusta cantar y bailar.|A nosotros nos gusta cantar y bailar.|
1|그녀는 패스트푸드를 좋아하지 않아.|(A ella) no le gusta la comida rápida.||
1|친구들이랑 축구하는 거 좋아해?|¿Te gusta jugar al fútbol con los amigos?|¿Te gusta jugar al fútbol con tus amigos?|
1|거의 일요일마다 축구해.|Juego al fútbol casi todos los domingos.||jugar: u → ue
1|무엇을 드릴까요?|¿Qué desean?|¿Qué desea?|
1|마실 것은요?|¿Y para beber?|¿Para beber?|
1|후식은 뭐가 있어요?|¿Qué tienen de postre?||
1|뭐 먹고 싶어?|¿Qué quieres comer?||
1|오늘은 파티에 못 가.|Hoy no puedo ir a la fiesta.||poder: o → ue
1|내 여동생은 집밥을 더 좋아해.|Mi hermana prefiere la comida de casa.||
1|우리는 2시에 점심을 먹어.|(Nosotros) almorzamos a las dos.||
1|수업은 몇 시에 시작해?|¿A qué hora empieza la clase?||
1|나는 늘 파에야를 주문해.|(Yo) siempre pido paella.||pedir: e → i
1|그 사람 이름 기억나?|¿Recuerdas su nombre?||
1|엄마가 나에게 돈을 주셔.|Mi madre me da dinero.||
1|나는 엄마에게 꽃을 선물해.|Le regalo flores a mi madre.||a mi madre가 있어도 le를 함께
2|우리 부모님은 개를 좋아하세요.|A mis padres les gustan los perros.||
2|우리 아빠는 고기 먹는 걸 무척 좋아하셔.|A mi padre le gusta mucho comer carne.||
2|저는 전식으로 해산물 파에야, 주요리로 생선 주세요.|Yo, de primero, una paella de mariscos y, de segundo, pescado.||
2|나는 축구 하는 건 안 좋아하지만, 축구 보는 건 좋아해.|No me gusta jugar al fútbol, pero me gusta ver el fútbol.||
2|우리 가족은 다섯 명이에요.|En mi familia somos cinco.|Somos cinco en mi familia.|
2|우리 할아버지는 87살이셔.|Mi abuelo tiene ochenta y siete años.||
2|내 여동생은 나보다 어려.|Mi hermana es menor que yo.||
2|나는 해산물을 무척 좋아하지만, 우리 남편은 안 좋아해.|Me gustan mucho los mariscos, pero a mi marido no le gustan.||
2|너는 무슨 음식을 좋아해?|¿Qué comida te gusta?||
2|우리 아이들은 아이스크림을 좋아해.|A mis hijos les gusta el helado.||
2|계산서 주세요.|La cuenta, por favor.||
2|저는 전식으로 샐러드 주세요.|De primero, una ensalada, por favor.|Yo, de primero, una ensalada.|
2|마실 것은 물 한 병 주세요.|Para beber, una botella de agua, por favor.|Para beber, agua, por favor.|
2|오늘 밤 우리는 영화 보러 가고 싶어.|Esta noche queremos ir al cine.|Queremos ir al cine esta noche.|
2|커피랑 차 중에 뭐가 더 좋아?|¿Qué prefieres, café o té?|¿Prefieres café o té?|preferir: e → ie
2|나는 주말에는 열 시간 자.|Los fines de semana duermo diez horas.|Duermo diez horas los fines de semana.|dormir: o → ue
2|영화는 8시에 시작해.|La película empieza a las ocho.||empezar: e → ie
2|웨이터가 우리에게 메뉴판을 줘.|El camarero nos da la carta.||
2|너한테 사진 한 장 보여 줄게.|Te muestro una foto.||mostrar: o → ue
2|우리 형은 결혼했고 아이가 둘이야.|Mi hermano está casado y tiene dos hijos.||
2|내 사촌은 나랑 나이가 같아. (사촌이 남자)|Mi primo tiene la misma edad que yo.||
2|너한테 이 식당 추천해. 음식이 아주 맛있어.|Te recomiendo este restaurante. La comida es muy rica.||
2|카드로 계산해도 돼요?|¿Puedo pagar con tarjeta?||
2|우리 부모님은 여행하는 걸 무척 좋아하셔.|A mis padres les gusta mucho viajar.||
2|나는 아빠에게 넥타이를 선물할 거야.|Voy a regalarle una corbata a mi padre.|Le voy a regalar una corbata a mi padre.|
`,
7: `
1|네 생일은 언제야?|¿Cuándo es tu cumpleaños?||
1|10월 1일이야.|Es el primero de octubre.|Es el uno de octubre.|1일은 el primero
1|오늘 날씨 어때?|¿Qué tiempo hace hoy?||
1|날씨 좋아.|Hace buen tiempo.||
1|더워.|Hace calor.||
1|바람이 불어.|Hace viento.||
1|흐려.|Está nublado.||
1|비가 많이 와.|Llueve mucho.||
1|무척 추워.|Hace mucho frío.||
1|안개가 꼈어.|Hay niebla.||
1|크리스마스는 12월 25일이에요.|La Navidad es el veinticinco de diciembre.||
1|섣달그믐 밤은 언제야?|¿Cuándo es la Nochevieja?||
1|집이 너무 더러워.|La casa está muy sucia.||
1|내가 설거지할게.|(Yo) lavo los platos.||
1|청소기 좀 돌려 줄래?|¿Quieres pasar la aspiradora?|¿Quieres pasar la aspiradora, por favor?|
1|나는 다림질을 해야 해.|Tengo que planchar la ropa.||tener que + 동사원형
1|내 남동생은 쓰레기를 버려야 해.|Mi hermano tiene que sacar la basura.||
1|먹고 나서는 (누구나) 설거지를 해야 해.|Hay que lavar los platos después de comer.||hay que = 누구나 ~해야 한다
1|나는 8시에 집에서 나가.|Salgo de casa a las ocho.||
1|너는 일요일마다 뭐 해?|¿Qué haces los domingos?||
1|내가 상을 차릴게.|(Yo) pongo la mesa.||
1|나는 그 사람 번호를 몰라.|No sé su número.||
1|나는 지하철로 수업에 와.|Vengo a clase en metro.||
1|빵 사? — 응, (그걸) 사.|¿Compras el pan? — Sí, lo compro.||
1|부엌 청소해? — 아니, 안 해.|¿Limpias la cocina? — No, no la limpio.||
1|나는 할머니를 찾아뵈어.|Visito a mi abuela.||사람 목적어 앞에는 a
2|서울은 여름에 무척 덥고 비가 많이 와요.|En Seúl hace mucho calor en verano y llueve mucho.||
2|내일은 흐리고 바람이 불 거예요.|Mañana va a estar nublado y va a hacer viento.||
2|일요일마다 나는 공원에서 운동하고 조부모님을 뵈어.|Los domingos hago ejercicio en el parque y visito a mis abuelos.||
2|우리는 집을 청소해야 해. 지금 (그걸) 청소할 거야.|Tenemos que limpiar la casa. Vamos a limpiarla ahora.|Tenemos que limpiar la casa. La vamos a limpiar ahora.|
2|내가 파티에 후식을 가져갈게. 너는 뭘 가져와?|Traigo el postre a la fiesta. ¿Qué traes tú?||
2|스페인에서는 12시에 포도 열두 알을 먹어.|En España tomamos doce uvas a las doce.||
2|내 생일은 3월 15일이야.|Mi cumpleaños es el quince de marzo.||
2|오늘은 며칠이야?|¿Qué fecha es hoy?|¿A qué fecha estamos hoy?;¿A cuántos estamos hoy?|
2|스페인은 4월에 날씨가 좋아.|En España hace buen tiempo en abril.|En abril hace buen tiempo en España.|
2|오늘은 무척 춥고 눈이 와.|Hoy hace mucho frío y nieva.||
2|비가 와. 우산을 가져가야 해.|Llueve. Tengo que llevar el paraguas.||
2|내일 우리는 6시에 집에서 나가야 해.|Mañana tenemos que salir de casa a las seis.||
2|나는 토요일마다 빨래를 해.|Los sábados lavo la ropa.|Lavo la ropa los sábados.|
2|저녁은 누가 만들어? — 내가 (그걸) 만들어.|¿Quién hace la cena? — La hago yo.|¿Quién hace la cena? — Yo la hago.|
2|창문 열어? — 응, (그걸) 열어.|¿Abres la ventana? — Sí, la abro.||
2|우리 집에서는 아빠가 장을 봐.|En mi casa mi padre hace la compra.||
2|나는 내 방을 정리해야 해.|Tengo que ordenar mi habitación.||
2|무슨 계절을 좋아해? — 가을을 좋아해.|¿Qué estación te gusta? — Me gusta el otoño.||
2|나는 매일 아침 개를 산책시켜.|Saco al perro todas las mañanas.|Todas las mañanas saco al perro.|
2|바르셀로나는 여름에 무척 더워.|En Barcelona hace mucho calor en verano.||
2|우리 친구들 만나? — 응, 내일 (그들을) 만나.|¿Ves a nuestros amigos? — Sí, los veo mañana.||
2|오늘 저녁에 친구들을 초대해. 너도 올래?|Esta noche invitamos a unos amigos. ¿Vienes también?|Esta noche invitamos a unos amigos. ¿Vienes tú también?|
2|나는 항상 진실을 말해.|Siempre digo la verdad.||decir → yo digo
2|이 책 읽어? — 아니, (그걸) 안 읽어.|¿Lees este libro? — No, no lo leo.||
2|나는 금요일 밤마다 친구들이랑 놀러 나가.|Salgo con mis amigos los viernes por la noche.|Los viernes por la noche salgo con mis amigos.|
2|한국은 겨울에 춥고 눈이 많이 와.|En Corea hace frío en invierno y nieva mucho.||
`,
8: `
1|몇 시야?|¿Qué hora es?||
1|2시 10분이야.|Son las dos y diez.||
1|1시 반이야.|Es la una y media.||1시만 Es la una
1|7시 45분이야.|Son las ocho menos cuarto.||30분이 넘으면 다음 시 + menos
1|9시 정각이야.|Son las nueve en punto.||
1|스페인어 수업은 몇 시에 있어?|¿A qué hora tienes la clase de español?||
1|3시 반에 있어.|La tengo a las tres y media.|A las tres y media.|
1|수업은 얼마 동안 해?|¿Cuánto tiempo dura la clase?||
1|50분 동안 해.|Dura cincuenta minutos.||
1|우리는 공항까지 가는 데 한 시간 걸려.|Tardamos una hora en llegar al aeropuerto.||tardar en + 동사원형
1|나는 7시에 잠이 깨.|Me despierto a las siete.||
1|나는 이를 닦아.|Me cepillo los dientes.||
1|나는 세수해.|Me lavo la cara.||
1|나는 12시에 잠자리에 들어.|Me acuesto a las doce.||
1|몇 시에 일어나?|¿A qué hora te levantas?||
1|마리사는 집에 들어갈 때 신발을 벗어.|Marisa se quita los zapatos al entrar a casa.||
1|무척 추워서 루르데스는 외투를 입어.|Como hace mucho frío, Lourdes se pone el abrigo.||
1|빅토르는 운동한 뒤에 샤워해.|Víctor se ducha después de hacer ejercicio.||
1|아나와 루이스는 서로 포옹해.|Ana y Luis se abrazan.||
1|우리는 토요일마다 만나.|Nos vemos los sábados.||
1|너희 서로 아는 사이야?|¿Os conocéis?|¿Vosotros os conocéis?|
1|그들은 악수해.|Se dan la mano.|Ellos se dan la mano.|
1|케이크랑 음료는 내가 맡을게.|Me encargo de la tarta y las bebidas.||
2|나는 매일 7시에 일어나.|Me levanto a las siete todos los días.|Todos los días me levanto a las siete.|
2|나는 샤워하고 머리를 말려.|Me ducho y me seco el pelo.||
2|비행기는 몇 시야? — 10시 반이야.|¿A qué hora es el vuelo? — Es a las diez y media.||
2|내 여동생은 12시에 잠자리에 들고 7시 45분에 일어나.|Mi hermana se acuesta a las doce y se levanta a las ocho menos cuarto.||
2|스페인 사람들은 볼에 두 번 키스하고, 한국 사람들은 악수해요.|Los españoles se dan dos besos y los coreanos se dan la mano.||
2|나는 세수하고, 이를 닦고, 8시에 집을 나서.|Me lavo la cara, me cepillo los dientes y salgo de casa a las ocho.||
2|지금 몇 시예요? — 4시 15분이에요.|¿Qué hora es? — Son las cuatro y cuarto.|¿Qué hora es? — Son las cuatro y quince.|
2|영화는 두 시간 동안 해.|La película dura dos horas.||
2|나는 회사까지 가는 데 30분 걸려.|Tardo media hora en llegar a la oficina.|Tardo treinta minutos en llegar a la oficina.|
2|너는 보통 몇 시에 자?|¿A qué hora te acuestas normalmente?|¿Normalmente a qué hora te acuestas?|
2|나는 아침에 샤워하고 오후에 운동해.|Me ducho por la mañana y hago ejercicio por la tarde.||
2|우리 아이들은 8시에 일어나서 옷을 입어.|Mis hijos se levantan a las ocho y se visten.||
2|너는 매일 머리 감아?|¿Te lavas el pelo todos los días?||
2|나는 주말에는 늦게 일어나.|Los fines de semana me levanto tarde.|Me levanto tarde los fines de semana.|
2|박물관은 몇 시에 열어요? — 10시에요.|¿A qué hora abre el museo? — A las diez.|¿A qué hora abre el museo? — Abre a las diez.|
2|우리는 매일 서로 전화해.|Nos llamamos todos los días.|Todos los días nos llamamos.|
2|기차는 마드리드에서 바르셀로나까지 세 시간 걸려.|El tren tarda tres horas de Madrid a Barcelona.||
2|너는 아침에 화장해?|¿Te maquillas por la mañana?||
2|나는 자기 전에 책을 읽어.|Leo un libro antes de acostarme.||antes de + 동사원형 = ~하기 전에
2|비행기는 12시 20분에 출발해.|El avión sale a las doce y veinte.||
2|그들은 서로 무척 사랑해.|Se quieren mucho.|Ellos se quieren mucho.|
2|나는 7시 반에 아침을 먹고 8시에 나가.|Desayuno a las siete y media y salgo a las ocho.||
2|추워서 나는 외투를 입어.|Como hace frío, me pongo el abrigo.||
2|우리는 스페인어 수업에서 서로 도와.|Nos ayudamos en la clase de español.||
2|수업은 몇 시에 끝나? — 9시 5분 전에 끝나.|¿A qué hora termina la clase? — Termina a las nueve menos cinco.|¿A qué hora termina la clase? — A las nueve menos cinco.|
2|나는 집에 오면 신발을 벗고 손을 씻어.|Al llegar a casa, me quito los zapatos y me lavo las manos.|Me quito los zapatos y me lavo las manos al llegar a casa.|al + 동사원형 = ~할 때
`,
9: `
1|스페인 예술 좋아해?|¿Te gusta el arte español?||
1|나는 가우디의 건축을 정말 좋아해.|Me encanta la arquitectura de Gaudí.||
1|내일 극장에 갈래?|¿Quieres ir al teatro mañana?||
1|몇 번째 줄에 앉고 싶어?|¿En qué fila quieres sentarte?||
1|내가 표를 예약할게.|Voy a reservar las entradas.||
1|우리는 입장권을 사야 해.|Tenemos que comprar las entradas.||
1|여가 시간에 뭐 하는 걸 좋아해?|¿Qué te gusta hacer en tu tiempo libre?||
1|나는 운동하고 요리하는 걸 좋아해.|Me gusta hacer deporte y cocinar.||
1|내 취미는 외국어 배우기야.|Mi afición es aprender idiomas.||
1|나는 스페인어랑 영어를 정말 좋아해.|Me encantan el español y el inglés.||둘이라 복수 → encantan
1|먼저 지하철을 타.|Primero tomo el metro.||
1|시간이 얼마나 걸려? — 한 시간 걸려.|¿Cuánto tiempo se tarda? — Se tarda una hora.||
1|집에 누구 있어? — 아니, 아무도 없어.|¿Hay alguien en casa? — No, no hay nadie.||
1|뭐 필요해? — 아니, 아무것도 필요 없어.|¿Quieres algo? — No, no quiero nada.||
1|나는 골프 안 좋아해. — 나도 안 좋아해.|No me gusta el golf. — A mí tampoco.||
1|나는 재즈 좋아해. — 나도.|Me gusta el jazz. — A mí también.||
1|나는 택시는 절대 안 타.|Nunca voy en taxi.|No voy nunca en taxi.|
1|네 책 빌려줄래? — 응, 빌려줄게.|¿Me prestas tu libro? — Sí, te lo presto.||
1|아나에게 꽃 줘? — 응, 줘.|¿Le das las flores a Ana? — Sí, se las doy.||le + las → se las
1|너 수영할 줄 알아?|¿Sabes nadar?||saber + 동사원형 = ~할 줄 알다
1|나는 마드리드를 아주 잘 알아.|Conozco Madrid muy bien.||
1|박물관이 어디 있는지 몰라.|No sé dónde está el museo.||
1|우리 형 알아?|¿Conoces a mi hermano?||사람 앞에는 a
1|그들은 영어를 할 줄 알아.|(Ellos) saben hablar inglés.||
1|우리는 좋은 식당을 하나 알아.|Conocemos un buen restaurante.||
2|학교 갈 때 무슨 교통수단을 이용해? — 지하철을 타.|¿Qué transporte usas para ir a la escuela? — Tomo el metro.||
2|이 영화 추천해? — 응, (그걸) 추천해.|¿Me recomiendas esta película? — Sí, te la recomiendo.||
2|평이 아주 좋아. 게다가 배우들도 훌륭해.|Tiene muy buena crítica. Además, los actores son excelentes.||
2|엄마에게 책을 선물할 거야. 내일 (그걸) 드릴 거야.|Voy a regalarle un libro a mi madre. Voy a dárselo mañana.|Voy a regalarle un libro a mi madre. Se lo voy a dar mañana.|
2|공항에서는 (누구나) 줄을 서고 짐을 부쳐야 해요.|En el aeropuerto hay que hacer cola y facturar el equipaje.||
2|나는 스페인에 아는 사람이 아무도 없지만, 스페인어를 조금 할 줄 알아.|No conozco a nadie en España, pero sé hablar un poco de español.||
2|나는 피카소 그림을 정말 좋아해.|Me encantan los cuadros de Picasso.||
2|프라도 미술관 알아? — 응, 아주 잘 알아.|¿Conoces el Museo del Prado? — Sí, lo conozco muy bien.||장소를 직접 겪어서 앎 → conocer
2|너 요리할 줄 알아? — 아니, 할 줄 몰라.|¿Sabes cocinar? — No, no sé.|¿Sabes cocinar? — No, no sé cocinar.|
2|나는 버스로 출근해.|Voy al trabajo en autobús.||
2|공항까지 택시로 얼마나 걸려요?|¿Cuánto tiempo se tarda en taxi hasta el aeropuerto?|¿Cuánto se tarda en taxi hasta el aeropuerto?|
2|오늘은 아무도 안 와.|Hoy no viene nadie.|Nadie viene hoy.;Hoy nadie viene.|
2|나는 그림 그리는 거 안 좋아해. — 나도 안 좋아해.|No me gusta pintar. — A mí tampoco.||
2|이 사진 나한테 보내 줄래? — 응, 지금 보내 줄게.|¿Me mandas esta foto? — Sí, te la mando ahora.||
2|엄마에게 이 편지 드려? — 응, 드려.|¿Le das esta carta a tu madre? — Sí, se la doy.||le + la → se la
2|나는 여가 시간에 음악을 듣고 책을 읽어.|En mi tiempo libre escucho música y leo libros.|Escucho música y leo libros en mi tiempo libre.|
2|우리 아빠는 운전할 줄 모르셔.|Mi padre no sabe conducir.||
2|나는 그 식당을 몰라.|No conozco ese restaurante.||
2|오늘 밤 콘서트 표 있어? — 아니, 하나도 없어.|¿Tienes entradas para el concierto de esta noche? — No, no tengo ninguna.||ninguna = 하나도 (없다)
2|나는 박물관에 걸어서 가.|Voy al museo a pie.|Voy andando al museo.|
2|기차표 나한테 사 줄래? — 응, 사 줄게.|¿Me compras el billete de tren? — Sí, te lo compro.||
2|무슨 운동 좋아해? — 테니스를 정말 좋아해.|¿Qué deporte te gusta? — Me encanta el tenis.||
2|나는 플라멩코 출 줄 몰라.|No sé bailar flamenco.||
2|마드리드에서는 지하철이 아주 편해.|En Madrid el metro es muy cómodo.||
2|친구들에게 사진 보여 줘? — 응, 보여 줘.|¿Les enseñas las fotos a tus amigos? — Sí, se las enseño.||les + las → se las
2|그 가수 이름 알아? — 아니, 몰라.|¿Sabes el nombre de ese cantante? — No, no lo sé.||정보·사실을 앎 → saber
`
};
