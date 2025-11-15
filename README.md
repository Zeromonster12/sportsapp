# SportsApp - Live Športové Výsledky

Moderná webová aplikácia na sledovanie live športových zápasov s podporou viacerých športov (NBA, NFL, MLB, NHL, NCAA a ďalšie). Aplikácia poskytuje real-time aktualizácie skóre, detailné štatistiky tímov a zápasov, možnosť sledovania obľúbených tímov a používateľskú autentifikáciu.

## Funkcie

- **Live výsledky** - Automatická aktualizácia každých 60 sekúnd
- **Viacero športov** - NBA, NFL, MLB, NHL, NCAA Football, NCAA Basketball a ďalšie
- **Filtrovanie** - Podľa športu a statusu zápasu (Live, Naplánované, Ukončené)
- **Detailné informácie** - Podstránky pre zápasy (`/match/[id]`) a tímy (`/team/[id]`)
- **Štatistiky tímov** - Komplexné štatistiky (ofenzíva, obrana, skórovanie)
- **Autentifikácia** - Prihlásenie cez Google OAuth alebo email/heslo (Supabase)
- **Obľúbené tímy** - Ukladanie a správa obľúbených tímov
- **Responzívny dizajn** - Optimalizované pre desktop aj mobile

## Technológie

- **Framework:** Next.js 15 (App Router)
- **Jazyk:** TypeScript
- **Štýly:** TailwindCSS
- **Dáta:** TheRundown API (RapidAPI)
- **Databáza:** Supabase
- **Autentifikácia:** Supabase Auth
- **Data Fetching:** SWR (s automatickým refreshom)
- **Caching:** Next.js revalidate

## Predpoklady

- Node.js 18+
- npm, yarn, alebo pnpm
- RapidAPI účet (TheRundown API)
- Supabase projekt

## Lokálne spustenie

### 1. Klonovanie repozitára

```bash
git clone <repository-url>
cd sportsapp
```

### 2. Inštalácia závislostí

```bash
npm install
```

### 3. Nastavenie environment premenných

Vytvorte `.env.local` súbor v root priečinku:

```env
# TheRundown API (RapidAPI)
RUNDOWN_API_HOST=therundown-therundown-v1.p.rapidapi.com
RUNDOWN_API_KEY=your_rapidapi_key_here

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Spustenie vývojového servera

```bash
npm run dev
```

Aplikácia bude dostupná na [http://localhost:3000](http://localhost:3000)

### 5. Build pre production

```bash
npm run build
npm start
```

## API Klúče

### TheRundown API (RapidAPI)

1. Zaregistrujte sa na [RapidAPI](https://rapidapi.com/)
2. Prihláste sa k [TheRundown API](https://rapidapi.com/therundown/api/therundown)
3. Skopírujte váš API kľúč do `.env.local`

### Supabase

1. Vytvorte projekt na [Supabase](https://supabase.com/)
2. Prejdite do Settings → API
3. Skopírujte `Project URL` a `anon/public key` do `.env.local`
4. Povoľte Google OAuth v Authentication → Providers

## Hlavné funkcie

### Filtrovanie zápasov

- Výber športu z bočného menu (desktop) alebo z mobilného filtra
- Filtrovanie podľa statusu: Všetky / Naživo / Naplánované / Ukončené

### Detailné zobrazenie

- **Zápasy**: Skóre, štatistiky, kurzy, head-to-head
- **Tímy**: Kompletné štatistiky sezóny (ofenzíva, obrana, skórovanie)

### Používateľské účty

- Registrácia/prihlásenie cez Google alebo email
- Správa profilu
- Ukladanie obľúbených tímov

## Cache stratégia

- **Hlavná stránka**: 60 sekúnd (kvôli live skóre)
- **Športy**: 5 minút
- **Tímy**: 24 hodín (štatistiky sa menia raz denne)

## Nasadená verzia

**Live Demo:** [https://sportsapp-deploy.vercel.app](https://sportsapp-deploy.vercel.app)

## Štruktúra projektu

```
sportsapp/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Autentifikácia
│   ├── match/[id]/        # Detail zápasu
│   ├── team/[id]/         # Detail tímu
│   └── page.tsx           # Hlavná stránka
├── components/            # React komponenty
├── context/              # React Context (AuthContext)
├── hooks/                # Custom hooks
├── lib/                  # Utility funkcie a API
└── public/               # Statické súbory
```
