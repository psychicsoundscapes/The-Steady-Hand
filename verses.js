const scriptures = [
    // --- BREAKING STRONGHOLDS & ADDICTION ---
    { text: "The weapons we fight with are not the weapons of the world. On the contrary, they have divine power to demolish strongholds.", ref: "2 Corinthians 10:4" },
    { text: "So if the Son sets you free, you will be free indeed.", ref: "John 8:36" },
    { text: "It is for freedom that Christ has set us free. Stand firm, then, and do not let yourselves be burdened again by a yoke of slavery.", ref: "Galatians 5:1" },
    { text: "No temptation has overtaken you except what is common to mankind. And God is faithful; he will not let you be tempted beyond what you can bear. But when you are tempted, he will also provide a way out so that you can endure it.", ref: "1 Corinthians 10:13" },
    { text: "So I say, walk by the Spirit, and you will not gratify the desires of the flesh.", ref: "Galatians 5:16" },
    { text: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!", ref: "2 Corinthians 5:17" },
    { text: "I have hidden your word in my heart that I might not sin against you.", ref: "Psalm 119:11" },
    { text: "Submit yourselves, then, to God. Resist the devil, and he will flee from you.", ref: "James 4:7" },
    { text: "Because he himself suffered when he was tempted, he is able to help those who are being tempted.", ref: "Hebrews 2:18" },
    { text: "For the grace of God has appeared that offers salvation to all people. It teaches us to say 'No' to ungodliness and worldly passions, and to live self-controlled, upright and godly lives.", ref: "Titus 2:11-12" },

    // --- RECOVERING FROM A SLIP / FAILURE ---
    { text: "For though the righteous fall seven times, they rise again, but the wicked stumble when calamity strikes.", ref: "Proverbs 24:16" },
    { text: "My flesh and my heart may fail, but God is the strength of my heart and my portion forever.", ref: "Psalm 73:26" },
    { text: "If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.", ref: "1 John 1:9" },
    { text: "Brothers and sisters, I do not consider myself yet to have taken hold of it. But one thing I do: Forgetting what is behind and straining toward what is ahead, I press on toward the goal.", ref: "Philippians 3:13-14" },
    { text: "The steadfast love of the Lord never ceases; his mercies never come to an end; they are new every morning; great is your faithfulness.", ref: "Lamentations 3:22-23" },
    { text: "Do not gloat over me, my enemy! Though I have fallen, I will rise. Though I sit in darkness, the Lord will be my light.", ref: "Micah 7:8" },

    // --- STRENGTH & ENDURANCE IN WEAKNESS ---
    { text: "But he said to me, 'My grace is sufficient for you, for my power is made perfect in weakness.' Therefore I will boast all the more gladly about my weaknesses, so that Christ’s power may rest on me.", ref: "2 Corinthians 12:9" },
    { text: "I can do all this through him who gives me strength.", ref: "Philippians 4:13" },
    { text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.", ref: "Isaiah 40:31" },
    { text: "He gives strength to the weary and increases the power of the weak.", ref: "Isaiah 40:29" },
    { text: "Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up.", ref: "Galatians 6:9" },
    { text: "Blessed is the one who perseveres under trial because, having stood the test, that person will receive the crown of life that the Lord has promised to those who love him.", ref: "James 1:12" },
    { text: "Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds, because you know that the testing of your faith produces perseverance.", ref: "James 1:2-3" },
    { text: "For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.", ref: "2 Timothy 1:7" },
    { text: "Therefore put on the full armor of God, so that when the day of evil comes, you may be able to stand your ground, and after you have done everything, to stand.", ref: "Ephesians 6:13" },

    // --- ANXIETY, FEAR & OVERWHELM ---
    { text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.", ref: "Philippians 4:6-7" },
    { text: "Cast all your anxiety on him because he cares for you.", ref: "1 Peter 5:7" },
    { text: "When anxiety was great within me, your consolation brought me joy.", ref: "Psalm 94:19" },
    { text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.", ref: "John 14:27" },
    { text: "I have told you these things, so that in me you may have peace. In this world you will have trouble. But take heart! I have overcome the world.", ref: "John 16:33" },
    { text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.", ref: "Isaiah 41:10" },
    { text: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", ref: "Joshua 1:9" },
    { text: "The Lord is my light and my salvation—whom shall I fear? The Lord is the stronghold of my life—of whom shall I be afraid?", ref: "Psalm 27:1" },
    { text: "Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me.", ref: "Psalm 23:4" },

    // --- HOPE, VICTORY & IDENTITY ---
    { text: "You, dear children, are from God and have overcome them, because the one who is in you is greater than the one who is in the world.", ref: "1 John 4:4" },
    { text: "For everyone born of God overcomes the world. This is the victory that has overcome the world, even our faith.", ref: "1 John 5:4" },
    { text: "No, in all these things we are more than conquerors through him who loved us.", ref: "Romans 8:37" },
    { text: "But thanks be to God! He gives us the victory through our Lord Jesus Christ.", ref: "1 Corinthians 15:57" },
    { text: "The Lord will fight for you; you need only to be still.", ref: "Exodus 14:14" },
    { text: "And the God of all grace, who called you to his eternal glory in Christ, after you have suffered a little while, will himself restore you and make you strong, firm and steadfast.", ref: "1 Peter 5:10" },
    { text: "Now to him who is able to do immeasurably more than all we ask or imagine, according to his power that is at work within us.", ref: "Ephesians 3:20" },
    { text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.", ref: "Jeremiah 29:11" },
    { text: "We are hard pressed on every side, but not crushed; perplexed, but not in despair; persecuted, but not abandoned; struck down, but not destroyed.", ref: "2 Corinthians 4:8-9" },
    { text: "Therefore we do not lose heart. Though outwardly we are wasting away, yet inwardly we are being renewed day by day.", ref: "2 Corinthians 4:16" },
    { text: "The thief comes only to steal and kill and destroy; I have come that they may have life, and have it to the full.", ref: "John 10:10" },

    // --- DISCIPLINE & MINDSET ---
    { text: "Do not conform to the pattern of this world, but be transformed by the renewing of your mind.", ref: "Romans 12:2" },
    { text: "Above all else, guard your heart, for everything you do flows from it.", ref: "Proverbs 4:23" },
    { text: "Set your minds on things above, not on earthly things.", ref: "Colossians 3:2" },
    { text: "Be alert and of sober mind. Your enemy the devil prowls around like a roaring lion looking for someone to devour.", ref: "1 Peter 5:8" },
    { text: "Therefore, with minds that are alert and fully sober, set your hope on the grace to be brought to you when Jesus Christ is revealed at his coming.", ref: "1 Peter 1:13" },
    { text: "Be on your guard; stand firm in the faith; be courageous; be strong.", ref: "1 Corinthians 16:13" },
    { text: "But you, man of God, flee from all this, and pursue righteousness, godliness, faith, love, endurance and gentleness. Fight the good fight of the faith.", ref: "1 Timothy 6:11-12a" },
    
    // --- TRUSTING GOD IN THE FIRE ---
    { text: "When you pass through the waters, I will be with you; and when you pass through the rivers, they will not sweep over you. When you walk through the fire, you will not be burned; the flames will not set you ablaze.", ref: "Isaiah 43:2" },
    { text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.", ref: "Proverbs 3:5-6" },
    { text: "The name of the Lord is a fortified tower; the righteous run to it and are safe.", ref: "Proverbs 18:10" },
    { text: "God is our refuge and strength, an ever-present help in trouble.", ref: "Psalm 46:1" },
    { text: "The Lord is a refuge for the oppressed, a stronghold in times of trouble.", ref: "Psalm 9:9" },
    { text: "I keep my eyes always on the Lord. With him at my right hand, I will not be shaken.", ref: "Psalm 16:8" },
    { text: "From the ends of the earth I call to you, I call as my heart grows faint; lead me to the rock that is higher than I.", ref: "Psalm 61:2" },
    { text: "Cast your cares on the Lord and he will sustain you; he will never let the righteous be shaken.", ref: "Psalm 55:22" },
    { text: "You meant evil against me, but God meant it for good in order to bring about this present result, to preserve many people alive.", ref: "Genesis 50:20" }
];
