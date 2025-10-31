// crie banco de dados
// use nome_banco
// criar coleções
db.createCollection("pacientes")

db.pacientes.insertMany([
    {
        _id: ObjectId(),
        nome: "Josse",
        dataNascimento: "2003-02-21",
        cpf: "999999999-99",
        telefone: "014 99999-9999",
        email: "emailteste@gmail.com",
        endereco: "Rua da Silva, 02",
        obs: "",
        dataCadastro: "2020-05-07"
    },
    {
        _id: ObjectId(),
        nome: "Mariana Souza",
        dataNascimento: "1998-07-14",
        cpf: "111111111-11",
        telefone: "011 98888-7777",
        email: "mariana.souza@gmail.com",
        endereco: "Av. Brasil, 1200",
        obs: "Paciente alérgica a penicilina",
        dataCadastro: "2021-03-22"
    },
    {
        _id: ObjectId(),
        nome: "Carlos Oliveira",
        dataNascimento: "1985-11-30",
        cpf: "222222222-22",
        telefone: "021 97777-8888",
        email: "carlos.oliveira@yahoo.com",
        endereco: "Rua das Flores, 45",
        obs: "",
        dataCadastro: "2019-12-15"
    },
    {
        _id: ObjectId(),
        nome: "Fernanda Lima",
        dataNascimento: "1990-04-10",
        cpf: "333333333-33",
        telefone: "031 96666-1234",
        email: "fernanda.lima@hotmail.com",
        endereco: "Av. Afonso Pena, 600",
        obs: "Fumante",
        dataCadastro: "2022-08-09"
    },
    {
        _id: ObjectId(),
        nome: "Rafael Martins",
        dataNascimento: "2001-09-25",
        cpf: "444444444-44",
        telefone: "041 95555-4444",
        email: "rafael.martins@gmail.com",
        endereco: "Rua XV de Novembro, 303",
        obs: "",
        dataCadastro: "2023-02-17"
    },
    {
        _id: ObjectId(),
        nome: "Patrícia Gomes",
        dataNascimento: "1979-01-19",
        cpf: "555555555-55",
        telefone: "051 94444-5555",
        email: "patricia.gomes@outlook.com",
        endereco: "Rua Porto Alegre, 77",
        obs: "Hipertensa",
        dataCadastro: "2018-09-01"
    },
    {
        _id: ObjectId(),
        nome: "Lucas Almeida",
        dataNascimento: "1995-12-03",
        cpf: "666666666-66",
        telefone: "061 93333-2222",
        email: "lucas.almeida@gmail.com",
        endereco: "Av. das Nações, 10",
        obs: "",
        dataCadastro: "2020-01-05"
    },
    {
        _id: ObjectId(),
        nome: "Juliana Ferreira",
        dataNascimento: "1988-05-27",
        cpf: "777777777-77",
        telefone: "071 92222-1111",
        email: "juliana.ferreira@gmail.com",
        endereco: "Rua Bahia, 58",
        obs: "Diabética tipo 2",
        dataCadastro: "2021-06-18"
    },
    {
        _id: ObjectId(),
        nome: "Thiago Santos",
        dataNascimento: "1992-03-08",
        cpf: "888888888-88",
        telefone: "081 91111-9999",
        email: "thiago.santos@gmail.com",
        endereco: "Rua Pernambuco, 90",
        obs: "",
        dataCadastro: "2019-11-11"
    },
    {
        _id: ObjectId(),
        nome: "Camila Rocha",
        dataNascimento: "2000-10-05",
        cpf: "999888777-66",
        telefone: "091 90000-0000",
        email: "camila.rocha@gmail.com",
        endereco: "Av. Independência, 250",
        obs: "Vegetariana",
        dataCadastro: "2024-04-02"
    }
]);

db.createCollection("anamneses")

db.anamneses.insertMany([
    {
        _id: ObjectId(),
        paciente: ObjectId("671cfae2f1a2c3a001a00001"), // Josse
        data: "31/05/2024",
        queixa: "Dor nas costas",
        historico: "Trabalha longas horas sentado; dor iniciou há 2 meses.",
        sintomas: "Dor lombar leve, piora ao final do dia.",
        exames: "RX lombar solicitado.",
        hipoteses: "Lombalgia postural.",
        planoTeurapeutico: "Alongamentos diários e fisioterapia."
    },
    {
        _id: ObjectId(),
        paciente: ObjectId("671cfae2f1a2c3a001a00002"), // Mariana Souza
        data: "05/06/2024",
        queixa: "Dor de cabeça frequente",
        historico: "Episódios semanais há 6 meses, piora com estresse.",
        sintomas: "Cefaleia bilateral, sem náusea.",
        exames: "Nenhum até o momento.",
        hipoteses: "Cefaleia tensional.",
        planoTeurapeutico: "Controle de estresse e hidratação adequada."
    },
    {
        _id: ObjectId(),
        paciente: ObjectId("671cfae2f1a2c3a001a00003"), // Carlos Oliveira
        data: "10/06/2024",
        queixa: "Fadiga constante",
        historico: "Trabalha em turno noturno, sono irregular.",
        sintomas: "Cansaço diário, sonolência diurna.",
        exames: "Hemograma completo solicitado.",
        hipoteses: "Síndrome da fadiga crônica ou anemia.",
        planoTeurapeutico: "Melhora do sono e suplementação conforme exames."
    },
    {
        _id: ObjectId(),
        paciente: ObjectId("671cfae2f1a2c3a001a00004"), // Fernanda Lima
        data: "12/06/2024",
        queixa: "Tosse seca persistente",
        historico: "Tosse há 3 semanas após gripe.",
        sintomas: "Sem febre, sem expectoração.",
        exames: "RX de tórax solicitado.",
        hipoteses: "Tosse pós-viral.",
        planoTeurapeutico: "Hidratação e acompanhamento."
    },
    {
        _id: ObjectId(),
        paciente: ObjectId("671cfae2f1a2c3a001a00005"), // Rafael Martins
        data: "15/06/2024",
        queixa: "Dor no joelho direito",
        historico: "Lesão durante prática esportiva há 1 mês.",
        sintomas: "Dor ao dobrar o joelho, sem inchaço.",
        exames: "Ressonância magnética do joelho.",
        hipoteses: "Distensão ligamentar leve.",
        planoTeurapeutico: "Repouso e fisioterapia."
    },
    {
        _id: ObjectId(),
        paciente: ObjectId("671cfae2f1a2c3a001a00006"), // Patrícia Gomes
        data: "17/06/2024",
        queixa: "Pressão alta",
        historico: "Hipertensa há 5 anos, sem controle adequado.",
        sintomas: "Cefaleia matinal e tontura.",
        exames: "MAPA solicitado.",
        hipoteses: "Hipertensão arterial não controlada.",
        planoTeurapeutico: "Ajuste de medicação e dieta com baixo sódio."
    },
    {
        _id: ObjectId(),
        paciente: ObjectId("671cfae2f1a2c3a001a00007"), // Lucas Almeida
        data: "19/06/2024",
        queixa: "Insônia",
        historico: "Dificuldade para dormir há 4 meses.",
        sintomas: "Sono fragmentado e despertares noturnos.",
        exames: "Polissonografia recomendada.",
        hipoteses: "Transtorno do sono por ansiedade.",
        planoTeurapeutico: "Higiene do sono e terapia cognitivo-comportamental."
    },
    {
        _id: ObjectId(),
        paciente: ObjectId("671cfae2f1a2c3a001a00008"), // Juliana Ferreira
        data: "22/06/2024",
        queixa: "Falta de ar leve ao esforço",
        historico: "Diabética tipo 2, sedentária.",
        sintomas: "Dispneia em subidas.",
        exames: "Eletrocardiograma solicitado.",
        hipoteses: "Início de insuficiência cardíaca.",
        planoTeurapeutico: "Atividade física leve e acompanhamento cardiológico."
    },
    {
        _id: ObjectId(),
        paciente: ObjectId("671cfae2f1a2c3a001a00009"), // Thiago Santos
        data: "25/06/2024",
        queixa: "Dor abdominal",
        historico: "Dor após refeições pesadas.",
        sintomas: "Náusea leve, sem vômitos.",
        exames: "Ultrassom abdominal.",
        hipoteses: "Gastrite.",
        planoTeurapeutico: "Dieta leve e omeprazol 20mg/dia."
    },
    {
        _id: ObjectId(),
        paciente: ObjectId("671cfae2f1a2c3a001a0000a"), // Camila Rocha
        data: "28/06/2024",
        queixa: "Fadiga e queda de cabelo",
        historico: "Vegetariana há 2 anos.",
        sintomas: "Cansaço e unhas quebradiças.",
        exames: "Ferritina e B12 solicitados.",
        hipoteses: "Anemia por deficiência de ferro ou B12.",
        planoTeurapeutico: "Suplementação conforme exames."
    },
    // ... continue com os demais até 25 registros ...
]);



db.createCollection("profissionais")

db.profissionais.insertMany([
    {
        _id: ObjectId(),
        nome: "João Pereira",
        dataNascimento: "1980-06-12",
        cpf: "123456789-10",
        telefone: "011 98888-1234",
        email: "joao.pereira@clinicavida.com",
        endereco: "Rua das Flores, 100",
        obs: "Especialista em ortopedia.",
        dataCadastro: "2021-03-15",
        funcao: "Ortopedista",
        login: "joaop",
        senha: "senha123"
    },
    {
        _id: ObjectId(),
        nome: "Maria Fernanda Costa",
        dataNascimento: "1985-09-22",
        cpf: "987654321-00",
        telefone: "021 97777-4321",
        email: "maria.costa@clinicavida.com",
        endereco: "Avenida Central, 250",
        obs: "Experiência em clínica geral.",
        dataCadastro: "2022-07-10",
        funcao: "Clínica Geral",
        login: "mariac",
        senha: "senha456"
    },
    {
        _id: ObjectId(),
        nome: "Ricardo Almeida",
        dataNascimento: "1990-01-30",
        cpf: "456789123-22",
        telefone: "031 96666-9876",
        email: "ricardo.almeida@clinicavida.com",
        endereco: "Rua do Sol, 58",
        obs: "Fisioterapeuta especializado em reabilitação esportiva.",
        dataCadastro: "2023-01-20",
        funcao: "Fisioterapeuta",
        login: "ricardoa",
        senha: "fisio2023"
    },
    {
        _id: ObjectId(),
        nome: "Camila Souza",
        dataNascimento: "1992-11-08",
        cpf: "321654987-33",
        telefone: "041 95555-6543",
        email: "camila.souza@clinicavida.com",
        endereco: "Rua Independência, 45",
        obs: "Psicóloga com foco em terapia cognitivo-comportamental.",
        dataCadastro: "2024-02-28",
        funcao: "Psicóloga",
        login: "camilas",
        senha: "psico2024"
    }
]);


db.createCollection("consultas")

db.consultas.insertMany([
    {
        _id: ObjectId(),
        paciente: ObjectId("671d00000000000000000001"), // Josse
        profissional: ObjectId("671d10000000000000000001"), // João Pereira
        dataHora: "2025-11-05T09:00:00",
        tipo: "avaliação",
        status: "agendada",
        obs: "Primeira consulta de rotina."
    },
    {
        _id: ObjectId(),
        paciente: ObjectId("671d00000000000000000002"), // Mariana Souza
        profissional: ObjectId("671d10000000000000000002"), // Maria Fernanda
        dataHora: "2025-11-05T10:30:00",
        tipo: "retorno",
        status: "agendada",
        obs: "Revisão de pressão arterial."
    },
    {
        _id: ObjectId(),
        paciente: ObjectId("671d00000000000000000003"), // Carlos Oliveira
        profissional: ObjectId("671d10000000000000000003"), // Ricardo Almeida
        dataHora: "2025-11-05T13:00:00",
        tipo: "fisioterapia",
        status: "agendada",
        obs: "Sessão de reabilitação lombar."
    },
    {
        _id: ObjectId(),
        paciente: ObjectId("671d00000000000000000004"),
        profissional: ObjectId("671d10000000000000000004"),
        dataHora: "2025-11-05T14:30:00",
        tipo: "psicologia",
        status: "agendada",
        obs: "Sessão de acompanhamento psicológico."
    },
    {
        _id: ObjectId(),
        paciente: ObjectId("671d00000000000000000005"),
        profissional: ObjectId("671d10000000000000000001"),
        dataHora: "2025-11-06T09:00:00",
        tipo: "avaliação",
        status: "agendada",
        obs: "Avaliação de dor no joelho."
    },
    {
        _id: ObjectId(),
        paciente: ObjectId("671d00000000000000000006"),
        profissional: ObjectId("671d10000000000000000002"),
        dataHora: "2025-11-06T10:00:00",
        tipo: "retorno",
        status: "agendada",
        obs: "Retorno para ajuste de medicação."
    },
    {
        _id: ObjectId(),
        paciente: ObjectId("671d00000000000000000007"),
        profissional: ObjectId("671d10000000000000000004"),
        dataHora: "2025-11-06T11:30:00",
        tipo: "psicologia",
        status: "agendada",
        obs: "Sessão sobre ansiedade."
    },
    {
        _id: ObjectId(),
        paciente: ObjectId("671d00000000000000000008"),
        profissional: ObjectId("671d10000000000000000003"),
        dataHora: "2025-11-06T13:30:00",
        tipo: "fisioterapia",
        status: "agendada",
        obs: "Tratamento de dor cervical."
    },
    {
        _id: ObjectId(),
        paciente: ObjectId("671d00000000000000000009"),
        profissional: ObjectId("671d10000000000000000002"),
        dataHora: "2025-11-06T15:00:00",
        tipo: "clínico",
        status: "agendada",
        obs: "Avaliação de gastrite."
    },
    {
        _id: ObjectId(),
        paciente: ObjectId("671d0000000000000000000a"),
        profissional: ObjectId("671d10000000000000000001"),
        dataHora: "2025-11-07T09:00:00",
        tipo: "avaliação",
        status: "agendada",
        obs: "Exame geral anual."
    },
    {
        _id: ObjectId(),
        paciente: ObjectId("671d0000000000000000000b"),
        profissional: ObjectId("671d10000000000000000003"),
        dataHora: "2025-11-07T10:30:00",
        tipo: "fisioterapia",
        status: "agendada",
        obs: "Terapia para ombro lesionado."
    },
    {
        _id: ObjectId(),
        paciente: ObjectId("671d0000000000000000000c"),
        profissional: ObjectId("671d10000000000000000004"),
        dataHora: "2025-11-07T11:30:00",
        tipo: "psicologia",
        status: "agendada",
        obs: "Sessão de terapia cognitiva."
    },
    {
        _id: ObjectId(),
        paciente: ObjectId("671d0000000000000000000d"),
        profissional: ObjectId("671d10000000000000000001"),
        dataHora: "2025-11-07T14:00:00",
        tipo: "avaliação",
        status: "agendada",
        obs: "Consulta ortopédica de rotina."
    },
    {
        _id: ObjectId(),
        paciente: ObjectId("671d0000000000000000000e"),
        profissional: ObjectId("671d10000000000000000002"),
        dataHora: "2025-11-07T15:00:00",
        tipo: "clínico",
        status: "agendada",
        obs: "Exame de sangue e revisão."
    },
    {
        _id: ObjectId(),
        paciente: ObjectId("671d0000000000000000000f"),
        profissional: ObjectId("671d10000000000000000003"),
        dataHora: "2025-11-07T16:00:00",
        tipo: "fisioterapia",
        status: "agendada",
        obs: "Exercícios de mobilidade."
    },
    {
        _id: ObjectId(),
        paciente: ObjectId("671d00000000000000000010"),
        profissional: ObjectId("671d10000000000000000004"),
        dataHora: "2025-11-08T09:30:00",
        tipo: "psicologia",
        status: "agendada",
        obs: "Sessão sobre controle emocional."
    },
    {
        _id: ObjectId(),
        paciente: ObjectId("671d00000000000000000011"),
        profissional: ObjectId("671d10000000000000000001"),
        dataHora: "2025-11-08T10:30:00",
        tipo: "avaliação",
        status: "agendada",
        obs: "Retorno pós-cirurgia ortopédica."
    },
    {
        _id: ObjectId(),
        paciente: ObjectId("671d00000000000000000012"),
        profissional: ObjectId("671d10000000000000000003"),
        dataHora: "2025-11-08T11:30:00",
        tipo: "fisioterapia",
        status: "agendada",
        obs: "Terapia de fortalecimento muscular."
    },
    {
        _id: ObjectId(),
        paciente: ObjectId("671d00000000000000000013"),
        profissional: ObjectId("671d10000000000000000002"),
        dataHora: "2025-11-08T14:00:00",
        tipo: "clínico",
        status: "agendada",
        obs: "Exame de rotina e controle glicêmico."
    },
    {
        _id: ObjectId(),
        paciente: ObjectId("671d00000000000000000014"),
        profissional: ObjectId("671d10000000000000000004"),
        dataHora: "2025-11-08T15:30:00",
        tipo: "psicologia",
        status: "agendada",
        obs: "Sessão de terapia semanal."
    },
    {
        _id: ObjectId(),
        paciente: ObjectId("671d00000000000000000015"),
        profissional: ObjectId("671d10000000000000000001"),
        dataHora: "2025-11-09T09:00:00",
        tipo: "avaliação",
        status: "agendada",
        obs: "Avaliação de dor lombar crônica."
    },
    {
        _id: ObjectId(),
        paciente: ObjectId("671d00000000000000000016"),
        profissional: ObjectId("671d10000000000000000003"),
        dataHora: "2025-11-09T10:30:00",
        tipo: "fisioterapia",
        status: "agendada",
        obs: "Terapia pós-lesão esportiva."
    },
    {
        _id: ObjectId(),
        paciente: ObjectId("671d00000000000000000017"),
        profissional: ObjectId("671d10000000000000000002"),
        dataHora: "2025-11-09T11:30:00",
        tipo: "retorno",
        status: "agendada",
        obs: "Acompanhamento de glicemia."
    },
    {
        _id: ObjectId(),
        paciente: ObjectId("671d00000000000000000018"),
        profissional: ObjectId("671d10000000000000000004"),
        dataHora: "2025-11-09T13:00:00",
        tipo: "psicologia",
        status: "agendada",
        obs: "Sessão sobre ansiedade social."
    },
    {
        _id: ObjectId(),
        paciente: ObjectId("671d00000000000000000019"),
        profissional: ObjectId("671d10000000000000000001"),
        dataHora: "2025-11-09T14:00:00",
        tipo: "avaliação",
        status: "agendada",
        obs: "Exame de coluna."
    },
    {
        _id: ObjectId(),
        paciente: ObjectId("671d0000000000000000001a"),
        profissional: ObjectId("671d10000000000000000002"),
        dataHora: "2025-11-10T09:00:00",
        tipo: "clínico",
        status: "agendada",
        obs: "Revisão de exames laboratoriais."
    },
    {
        _id: ObjectId(),
        paciente: ObjectId("671d0000000000000000001b"),
        profissional: ObjectId("671d10000000000000000003"),
        dataHora: "2025-11-10T10:30:00",
        tipo: "fisioterapia",
        status: "agendada",
        obs: "Sessão de reabilitação pós-cirurgia."
    },
    {
        _id: ObjectId(),
        paciente: ObjectId("671d0000000000000000001c"),
        profissional: ObjectId("671d10000000000000000004"),
        dataHora: "2025-11-10T11:30:00",
        tipo: "psicologia",
        status: "agendada",
        obs: "Sessão sobre autoestima."
    },
    {
        _id: ObjectId(),
        paciente: ObjectId("671d0000000000000000001d"),
        profissional: ObjectId("671d10000000000000000001"),
        dataHora: "2025-11-10T13:30:00",
        tipo: "avaliação",
        status: "agendada",
        obs: "Acompanhamento ortopédico."
    },
    {
        _id: ObjectId(),
        paciente: ObjectId("671d0000000000000000001e"),
        profissional: ObjectId("671d10000000000000000002"),
        dataHora: "2025-11-10T15:00:00",
        tipo: "retorno",
        status: "agendada",
        obs: "Ajuste de medicamentos e revisão de sintomas."
    }
]);
