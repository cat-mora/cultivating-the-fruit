export type ActivityCategory = 'self-reflection' | 'action-for-partner' | 'action-with-partner';

export interface Activity {
  id: string;
  duration_minutes: number;
  title: string;
  description: string;
  category: ActivityCategory;
}

export interface DailyContent {
  day_number: number;
  fruit_theme: string;
  tone: 'Gentle' | 'Encouraging' | 'Challenging';
  bible_reference: string;
  bible_text: Record<string, string>; // Record<Translation, Text>
  activities: Activity[];
}

export const JOURNEY_CONTENT: Record<string, DailyContent[]> = {
  strengthen: [
    // Day 1: Love
    {
      day_number: 1,
      fruit_theme: 'Love',
      tone: 'Encouraging',
      bible_reference: 'Song of Solomon 1:2',
      bible_text: {
        NIV: 'Let him kiss me with the kisses of his mouth—for your love is more delightful than wine.',
        ESV: 'Let him kiss me with the kisses of his mouth! For your love is better than wine;',
        KJV: 'Let him kiss me with the kisses of his mouth: for thy love is better than wine.',
        NLT: 'Kiss me and kiss me again, for your love is sweeter than wine.',
        NKJV: 'Let him kiss me with the kisses of his mouth—For your love is better than wine.',
      },
      activities: [
        { id: 's1-5', duration_minutes: 5, title: 'Reflect/Journal/Pray', description: 'Do you still long for closeness with your spouse, or have you let routine dull that desire? What would it look like to lean back into affection and passion?', category: 'self-reflection' },
        { id: 's1-15', duration_minutes: 15, title: 'Pray for renewed desire', description: 'Take a few quiet minutes to pray about your relationship, asking God to restore closeness, affection and desire between you. Be honest about where things have felt flat or routine.', category: 'self-reflection' },
        { id: 's1-30', duration_minutes: 30, title: 'Create a small moment of ease for them', description: 'Do one simple thing today that makes your spouse’s day feel a little easier or more enjoyable. Choose something specific to them rather than something generic.', category: 'action-for-partner' },
        { id: 's1-60', duration_minutes: 60, title: 'Stay physically close for a few minutes', description: 'Take 15–20 minutes to sit or lie close together and include intentional physical touch, like holding each other, a longer kiss or staying connected without distraction.', category: 'action-with-partner' },
        { id: 's1-120', duration_minutes: 120, title: 'Create a relaxed, intimate space', description: 'Set aside at least an hour together where you can be physically close without rushing. Let yourselves enjoy touch, closeness and, if it feels natural, allow that to build into deeper intimacy.', category: 'action-with-partner' },
      ]
    },
    // Day 2: Admiration
    {
      day_number: 2,
      fruit_theme: 'Admiration',
      tone: 'Encouraging',
      bible_reference: 'Song of Solomon 1:9',
      bible_text: {
        NIV: 'I liken you, my darling, to a mare among Pharaoh’s chariot horses.',
        ESV: 'I compare you, my love, to a mare among Pharaoh’s chariots.',
        KJV: 'I have compared thee, O my love, to a company of horses in Pharaoh\'s chariots.',
        NLT: 'You are as exciting, my darling, as a mare among Pharaoh’s stallions.',
        NKJV: 'I have compared you, my love, to my filly among Pharaoh’s chariots.',
      },
      activities: [
        { id: 's2-5', duration_minutes: 5, title: 'Reflect/Journal/Pray', description: 'When was the last time your spouse truly stood out to you? What makes them different from everyone else in your eyes?', category: 'self-reflection' },
        { id: 's2-15', duration_minutes: 15, title: 'Let them know what sets them apart', description: 'Think of one thing that makes your spouse different from everyone else, and share it with them in a natural moment today. Keep it specific so they can really feel it.', category: 'self-reflection' },
        { id: 's2-30', duration_minutes: 30, title: 'Do something thoughtful for them', description: 'Choose one small, thoughtful action today that reflects what you admire about your spouse, like preparing something they enjoy or taking care of something for them.', category: 'action-for-partner' },
        { id: 's2-60', duration_minutes: 60, title: 'Exchange appreciation', description: 'Take 15–20 minutes together and each share something you admire about the other. Let it land without brushing it off or turning it into a joke.', category: 'action-with-partner' },
        { id: 's2-120', duration_minutes: 120, title: 'Enjoy being out together', description: 'Set aside at least an hour to go somewhere or sit somewhere you can simply enjoy each other’s company. Let appreciation come through the way you look at and respond to each other.', category: 'action-with-partner' },
      ]
    },
    // Day 3: Joy
    {
      day_number: 3,
      fruit_theme: 'Joy',
      tone: 'Encouraging',
      bible_reference: 'Proverbs 5:18',
      bible_text: {
        NIV: 'May your fountain be blessed, and may you rejoice in the wife of your youth.',
        ESV: 'Let your fountain be blessed, and rejoice in the wife of your youth.',
        KJV: 'Let thy fountain be blessed: and rejoice with the wife of thy youth.',
        NLT: 'Let your wife be a fountain of blessing for you. Rejoice in the wife of your youth.',
        NKJV: 'Let your fountain be blessed, And rejoice with the wife of your youth.',
      },
      activities: [
        { id: 's3-5', duration_minutes: 5, title: 'Reflect/Journal/Pray', description: 'Do you actively rejoice in your spouse, or have you started to take them for granted? What first drew you to them, and where do you still see that today?', category: 'self-reflection' },
        { id: 's3-15', duration_minutes: 15, title: 'Bring back something you love about them', description: 'Think back to earlier in your relationship and share one thing you loved about your spouse then that you still see now. Keep it simple and real.', category: 'action-with-partner' },
        { id: 's3-30', duration_minutes: 30, title: 'Do something that lifts their mood', description: 'Look for an opportunity to brighten your spouse’s day in a small but meaningful way. Choose something that would genuinely make them feel good.', category: 'action-with-partner' },
        { id: 's3-60', duration_minutes: 60, title: 'Choose something fun together', description: 'Take 15–20 minutes to do something light and enjoyable together, like a short walk or sitting outside. Keep it easy rather than meaningful.', category: 'action-with-partner' },
        { id: 's3-120', duration_minutes: 120, title: 'Return to something familiar', description: 'Set aside at least an hour to revisit something you used to enjoy together. Focus on the feeling of being together, not recreating it perfectly.', category: 'action-with-partner' },
      ]
    },
    // Day 4: Admiration
    {
      day_number: 4,
      fruit_theme: 'Admiration',
      tone: 'Encouraging',
      bible_reference: 'Song of Solomon 1:15',
      bible_text: {
        NIV: 'How beautiful you are, my darling! Oh, how beautiful! Your eyes are doves.',
        ESV: 'Behold, you are beautiful, my love; behold, you are beautiful; your eyes are doves.',
        KJV: 'Behold, thou art fair, my love; behold, thou art fair; thou hast doves\' eyes.',
        NLT: 'How beautiful you are, my darling, how beautiful! Your eyes are like doves.',
        NKJV: 'Behold, you are fair, my love! Behold, you are fair! You have dove’s eyes.',
      },
      activities: [
        { id: 's4-5', duration_minutes: 5, title: 'Reflect/Journal/Pray', description: 'Do you still notice your spouse’s beauty, both outwardly and inwardly? When was the last time you paused to really see them?', category: 'self-reflection' },
        { id: 's4-15', duration_minutes: 15, title: 'Put words to what you see', description: 'Notice something about your spouse’s character or presence today and express it to them. Keep it honest and specific.', category: 'action-with-partner' },
        { id: 's4-30', duration_minutes: 30, title: 'Write it where they’ll find it', description: 'Take a moment to write a short note or message about what you appreciate in them as a person. Leave it somewhere they’ll come across it unexpectedly.', category: 'action-with-partner' },
        { id: 's4-60', duration_minutes: 60, title: 'Slow down and be present', description: 'Take 15–20 minutes to sit together without distractions and stay engaged with each other. Let the moment unfold without rushing it.', category: 'action-with-partner' },
        { id: 's4-120', duration_minutes: 120, title: 'Create a calm, distraction-free environment', description: 'Set aside at least an hour where you remove distractions and create a calm space together, like dim lighting, music or a quiet setting, so you can focus fully on each other.', category: 'action-with-partner' },
      ]
    },
    // Day 5: Love
    {
      day_number: 5,
      fruit_theme: 'Love',
      tone: 'Encouraging',
      bible_reference: 'Song of Solomon 2:3',
      bible_text: {
        NIV: 'Like an apple tree among the trees of the forest is my beloved among the young men. I delight to sit in his shade, and his fruit is sweet to my taste.',
        ESV: 'As an apple tree among the trees of the forest, so is my beloved among the young men. With great delight I sat in his shadow, and his fruit was sweet to my taste.',
        KJV: 'As the apple tree among the trees of the wood, so is my beloved among the sons. I sat down under his shadow with great delight, and his fruit was sweet to my taste.',
        NLT: 'Like the finest apple tree in the orchard is my lover among other young men. I sit in his delightful shade and taste his delicious fruit.',
        NKJV: 'Like an apple tree among the trees of the woods, so is my beloved among the sons. I sat down in his shade with great delight, and his fruit was sweet to my taste.',
      },
      activities: [
        { id: 's5-5', duration_minutes: 5, title: 'Reflect/Journal/Pray', description: 'Does your spouse feel like a place of delight, comfort and sweetness to you? If that has faded, what may have crowded it out?', category: 'self-reflection' },
        { id: 's5-15', duration_minutes: 15, title: 'Let them know you enjoy them', description: 'Notice something about being with your spouse that you genuinely enjoy and share it in a natural way today. Keep it light and sincere.', category: 'action-with-partner' },
        { id: 's5-30', duration_minutes: 30, title: 'Ease something for them', description: 'Look for one small, practical way to take something off your spouse’s plate today. Make their day feel just a little lighter.', category: 'action-for-partner' },
        { id: 's5-60', duration_minutes: 60, title: 'Create an easy, physical moment together', description: 'Take 15–20 minutes to sit or lie close together and allow physical touch to be part of the moment, whether that’s cuddling, holding each other or staying connected without distraction.', category: 'action-with-partner' },
        { id: 's5-120', duration_minutes: 120, title: 'Slow down and enjoy each other physically', description: 'Set aside at least an hour together where you can be relaxed and physically close. Let yourselves enjoy touch, closeness and, if it feels natural, allow that to build into deeper intimacy.', category: 'action-with-partner' },
      ]
    },
    // Day 6: Love
    {
      day_number: 6,
      fruit_theme: 'Love',
      tone: 'Gentle',
      bible_reference: 'Colossians 3:12',
      bible_text: {
        NIV: 'Therefore, as God’s chosen people, holy and dearly loved, clothe yourselves with compassion, kindness, humility, gentleness and patience.',
        ESV: 'Put on then, as God’s chosen ones, holy and beloved, compassionate hearts, kindness, humility, meekness, and patience,',
        KJV: 'Put on therefore, as the elect of God, holy and beloved, bowels of mercies, kindness, humbleness of mind, meekness, longsuffering;',
        NLT: 'Since God chose you to be the holy people he loves, you must clothe yourselves with tenderhearted mercy, kindness, humility, gentleness, and patience.',
        NKJV: 'Therefore, as the elect of God, holy and beloved, put on tender mercies, kindness, humility, meekness, longsuffering;',
      },
      activities: [
        { id: 's6-5', duration_minutes: 5, title: 'Reflect/Journal/Pray', description: 'When have you been unkind or unforgiving to your spouse recently? What was really happening in your heart and mind when you did that?', category: 'self-reflection' },
        { id: 's6-15', duration_minutes: 15, title: 'Take a moment to reset your posture', description: 'Take a few quiet minutes to reflect on your attitude toward your spouse today and ask God to help you respond with more patience, kindness and humility.', category: 'self-reflection' },
        { id: 's6-30', duration_minutes: 30, title: 'Take something off their plate', description: 'Choose one task your spouse would normally need to handle today and do it for them without being asked. Make their day feel lighter in a practical way.', category: 'action-for-partner' },
        { id: 's6-60', duration_minutes: 60, title: 'Talk about how you’ve both been showing up', description: 'Take 15–20 minutes together and gently share how you’ve each been feeling in the relationship lately. Keep it honest but kind, without blaming or defending.', category: 'action-with-partner' },
        { id: 's6-120', duration_minutes: 120, title: 'Have a deeper, honest conversation', description: 'Set aside at least an hour to talk more openly about how you’ve both been feeling. Stay patient, listen well, and focus on understanding rather than fixing.', category: 'action-with-partner' },
      ]
    },
    // Day 7: Love
    {
      day_number: 7,
      fruit_theme: 'Love',
      tone: 'Encouraging',
      bible_reference: 'Song of Solomon 2:10',
      bible_text: {
        NIV: 'My beloved spoke and said to me, “Arise, my darling, my beautiful one, come with me.”',
        ESV: 'My beloved speaks and says to me: “Arise, my love, my beautiful one, and come away,”',
        KJV: 'My beloved spake, and said unto me, Rise up, my love, my fair one, and come away.',
        NLT: 'My lover said to me, “Rise up, my darling! Come away with me, my fair one!”',
        NKJV: 'My beloved spoke, and said to me: “Rise up, my love, my fair one, and come away.',
      },
      activities: [
        { id: 's7-5', duration_minutes: 5, title: 'Reflect/Journal/Pray', description: 'When was the last time you invited your spouse into a moment of connection, fun or closeness? Are you still creating space for the two of you to step away from routine together?', category: 'self-reflection' },
        { id: 's7-15', duration_minutes: 15, title: 'Invite them into a moment', description: 'At some point today, invite your spouse to step into a small moment with you, whether it’s sitting together, stepping outside or taking a short break. Keep it simple.', category: 'action-with-partner' },
        { id: 's7-30', duration_minutes: 30, title: 'Create space for them to pause', description: 'Handle something practical for your spouse today so they have a moment to step out of their routine. Give them space without needing them to ask for it.', category: 'action-for-partner' },
        { id: 's7-60', duration_minutes: 60, title: 'Take a short break together', description: 'Take 15–20 minutes to step away from whatever you’re both doing and spend that time together. Keep it light and focused on being present.', category: 'action-with-partner' },
        { id: 's7-120', duration_minutes: 120, title: 'Step away from the usual', description: 'Set aside at least an hour to intentionally break out of your normal routine together. Go somewhere or do something that helps you reconnect outside of the everyday flow.', category: 'action-with-partner' },
      ]
    },
    // Day 8: Love
    {
      day_number: 8,
      fruit_theme: 'Love',
      tone: 'Encouraging',
      bible_reference: '1 Corinthians 13:4',
      bible_text: {
        NIV: 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud.',
        ESV: 'Love is patient and kind; love does not envy or boast; it is not arrogant.',
        KJV: 'Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up.',
        NLT: 'Love is patient and kind. Love is not jealous or boastful or proud.',
        NKJV: 'Love suffers long and is kind; love does not envy; love does not parade itself, is not puffed up.',
      },
      activities: [
        { id: 's8-5', duration_minutes: 5, title: 'Reflect/Journal/Pray', description: 'What does love mean to you in practice? What are all the ways you feel love, and show love, for your spouse?', category: 'self-reflection' },
        { id: 's8-15', duration_minutes: 15, title: 'Put your version of love into words', description: 'Take a moment today to express what love looks like to you in action, either in a message or in person. Keep it grounded in real behaviour.', category: 'action-with-partner' },
        { id: 's8-30', duration_minutes: 30, title: 'Show love in a practical way', description: 'Choose one specific action today that reflects patience or kindness toward your spouse. Let your actions match what you believe love is.', category: 'action-with-partner' },
        { id: 's8-60', duration_minutes: 60, title: 'Compare how you experience love', description: 'Take 15–20 minutes together to share how each of you feels most loved in everyday life. Stay curious rather than trying to agree.', category: 'action-with-partner' },
        { id: 's8-120', duration_minutes: 120, title: 'Try each other’s way of feeling loved', description: 'Set aside at least an hour to intentionally show love in the way your spouse receives it best, even if it’s different from your natural style.', category: 'action-with-partner' },
      ]
    },
    // Day 9: Love
    {
      day_number: 9,
      fruit_theme: 'Love',
      tone: 'Encouraging',
      bible_reference: 'Song of Solomon 2:16',
      bible_text: {
        NIV: 'My beloved is mine and I am his; he browses among the lilies.',
        ESV: 'My beloved is mine, and I am his; he grazes among the lilies.',
        KJV: 'My beloved is mine, and I am his: he feedeth among the lilies.',
        NLT: 'My lover is mine, and I am his. He browses among the lilies.',
        NKJV: 'My beloved is mine, and I am his. He feeds his flock among the lilies.',
      },
      activities: [
        { id: 's9-5', duration_minutes: 5, title: 'Reflect/Journal/Pray', description: 'Do you still feel chosen by your spouse, and do they feel chosen by you? What helps strengthen that sense of belonging between you?', category: 'self-reflection' },
        { id: 's9-15', duration_minutes: 15, title: 'Reinforce that you choose them', description: 'Let your spouse know in a simple way today that you choose them and value being together. Keep it natural and not over-explained.', category: 'action-with-partner' },
        { id: 's9-30', duration_minutes: 30, title: 'Do something that supports your “us”', description: 'Take care of something today that benefits both of you as a couple, like organising a shared task or preparing something that makes your time together easier.', category: 'action-with-partner' },
        { id: 's9-60', duration_minutes: 60, title: 'Spend time reinforcing connection', description: 'Take 15–20 minutes together to check in on how connected you’ve both been feeling lately. Keep it open and without pressure.', category: 'action-with-partner' },
        { id: 's9-120', duration_minutes: 120, title: 'Do something that reinforces your partnership', description: 'Set aside at least an hour to do something as a team, like planning something together, organising part of your life or working toward a shared goal.', category: 'action-with-partner' },
      ]
    },
    // Day 10: Love
    {
      day_number: 10,
      fruit_theme: 'Love',
      tone: 'Encouraging',
      bible_reference: 'Song of Solomon 3:4',
      bible_text: {
        NIV: 'Scarcely had I passed them when I found the one my heart loves. I held him and would not let him go.',
        ESV: 'Scarcely had I passed them when I found him whom my soul loves. I held him, and would not let him go.',
        KJV: 'It was but a little that I passed from them, but I found him whom my soul loveth: I held him, and would not let him go.',
        NLT: 'Soon I found the one I love. I caught and held him tightly, then I brought him to my mother’s house.',
        NKJV: 'Scarcely had I passed by them, when I found the one I love. I held him and would not let him go.',
      },
      activities: [
        { id: 's10-5', duration_minutes: 5, title: 'Reflect/Journal/Pray', description: 'Do you reach for your spouse and hold onto connection when you have the chance, or do you let those moments pass? What helps you stay emotionally and physically close?', category: 'self-reflection' },
        { id: 's10-15', duration_minutes: 15, title: 'Reach for connection today', description: 'Make a conscious choice today to reach for your spouse, whether through a message, touch or shared moment, instead of letting the opportunity pass.', category: 'action-for-partner' },
        { id: 's10-30', duration_minutes: 30, title: 'Remove something from their day', description: 'Notice one thing your spouse would normally need to do today and take care of it for them without being asked.', category: 'self-reflection' },
        { id: 's10-60', duration_minutes: 60, title: 'Hold onto the moment a little longer', description: 'Take 15–20 minutes together and stay physically close, whether through holding each other, sitting close or lingering in touch longer than usual.', category: 'action-with-partner' },
        { id: 's10-120', duration_minutes: 120, title: 'Create an evening of closeness', description: 'Set aside at least an hour together where you prioritise physical and emotional closeness. Stay connected through touch, and allow that closeness to deepen naturally.', category: 'action-with-partner' },
      ]
    },
    // Day 11: Admiration
    {
      day_number: 11,
      fruit_theme: 'Admiration',
      tone: 'Encouraging',
      bible_reference: 'Song of Solomon 4:1',
      bible_text: {
        NIV: 'How beautiful you are, my darling! Oh, how beautiful! Your eyes behind your veil are doves.',
        ESV: 'Behold, you are beautiful, my love, behold, you are beautiful! Your eyes are doves behind your veil.',
        KJV: 'Behold, thou art fair, my love; behold, thou art fair; thou hast doves\' eyes within thy locks.',
        NLT: 'You are beautiful, my darling, beautiful beyond words. Your eyes are like doves behind your veil.',
        NKJV: 'Behold, you are fair, my love! Behold, you are fair! You have dove’s eyes behind your veil.',
      },
      activities: [
        { id: 's11-5', duration_minutes: 5, title: 'Reflect/Journal/Pray', description: 'When was the last time you truly noticed your spouse and told them what you see in them? Not just generally, but specifically?', category: 'self-reflection' },
        { id: 's11-15', duration_minutes: 15, title: 'Call out something specific you notice', description: 'Notice one specific detail about your spouse today and point it out to them in a natural way. Make it something real rather than generic.', category: 'self-reflection' },
        { id: 's11-30', duration_minutes: 30, title: 'Respond to something they’ve done', description: 'Notice something your spouse has done recently and respond with a practical action that acknowledges it, like supporting them or following through on something.', category: 'action-with-partner' },
        { id: 's11-60', duration_minutes: 60, title: 'Spend time noticing each other', description: 'Take 15–20 minutes together and intentionally pay attention to each other, whether through conversation or simply being present. Stay engaged rather than distracted.', category: 'action-with-partner' },
        { id: 's11-120', duration_minutes: 120, title: 'Go somewhere and observe each other', description: 'Set aside at least an hour to go out together or sit somewhere different, and pay attention to each other in that setting. Let your appreciation show naturally.', category: 'action-with-partner' },
      ]
    },
    // Day 12: Admiration
    {
      day_number: 12,
      fruit_theme: 'Admiration',
      tone: 'Encouraging',
      bible_reference: 'Song of Solomon 4:7',
      bible_text: {
        NIV: 'You are altogether beautiful, my darling; there is no flaw in you.',
        ESV: 'You are altogether beautiful, my love; there is no flaw in you.',
        KJV: 'Thou art all fair, my love; there is no spot in thee.',
        NLT: 'You are altogether beautiful, my darling, beautiful in every way.',
        NKJV: 'You are all fair, my love, and there is no spot in you.',
      },
      activities: [
        { id: 's12-5', duration_minutes: 5, title: 'Reflect/Journal/Pray', description: 'Do you focus more on your spouse’s flaws or their strengths? What would shift if you chose to see them through a lens of love and admiration more often?', category: 'self-reflection' },
        { id: 's12-15', duration_minutes: 15, title: 'Shift what you focus on', description: 'Make a conscious effort today to focus on your spouse’s strengths rather than their flaws, and express one of those strengths to them.', category: 'action-with-partner' },
        { id: 's12-30', duration_minutes: 30, title: 'Act in a way that affirms them', description: 'Choose one action today that shows you value your spouse as they are, like supporting something important to them or easing a pressure they’re feeling.', category: 'action-with-partner' },
        { id: 's12-60', duration_minutes: 60, title: 'Talk about what you value most', description: 'Take 15–20 minutes together to share what you value most about each other. Keep it focused on appreciation, not comparison or fixing.', category: 'action-with-partner' },
        { id: 's12-120', duration_minutes: 120, title: 'Create a positive, criticism-free space', description: 'Set aside at least an hour where you intentionally focus only on what you appreciate about each other. Keep conversation and tone affirming throughout.', category: 'action-with-partner' },
      ]
    },
    // Day 13: Love
    {
      day_number: 13,
      fruit_theme: 'Love',
      tone: 'Gentle',
      bible_reference: '1 John 3:18',
      bible_text: {
        NIV: 'Dear children, let us not love with words or speech but with actions and in truth.',
        ESV: 'Little children, let us not love in word or talk but in deed and in truth.',
        KJV: 'My little children, let us not love in word, neither in tongue; but in deed and in truth.',
        NLT: 'Dear children, let’s not merely say that we love each other; let us show the truth by our actions.',
        NKJV: 'My little children, let us not love in word or in tongue, but in deed and in truth.',
      },
      activities: [
        { id: 's13-5', duration_minutes: 5, title: 'Reflect/Journal/Pray', description: 'Are there ways you say “I love you” out of habit, but don’t always back it up with action? What could that look like today?', category: 'self-reflection' },
        { id: 's13-15', duration_minutes: 15, title: 'Back up your words with action', description: 'Think about something you often say but don’t always show, and take one step today to act on it. Keep it simple and real.', category: 'action-with-partner' },
        { id: 's13-30', duration_minutes: 30, title: 'Follow through in a practical way', description: 'Choose one thing you know matters to your spouse and act on it without being asked. Let your actions speak clearly.', category: 'action-for-partner' },
        { id: 's13-60', duration_minutes: 60, title: 'Compare words vs actions', description: 'Take 15–20 minutes together to talk about how each of you experiences love in action. Keep it open and curious rather than defensive.', category: 'action-with-partner' },
        { id: 's13-120', duration_minutes: 120, title: 'Live out what you say', description: 'Set aside at least an hour together and be intentional about showing love through what you do, not just what you say. Let your behaviour reflect what matters to each other.', category: 'action-with-partner' },
      ]
    },
    // Day 14: Love
    {
      day_number: 14,
      fruit_theme: 'Love',
      tone: 'Encouraging',
      bible_reference: 'Song of Solomon 4:9',
      bible_text: {
        NIV: 'You have stolen my heart, my sister, my bride; you have stolen my heart with one glance of your eyes.',
        ESV: 'You have captivated my heart, my sister, my bride; you have captivated my heart with one glance of your eyes.',
        KJV: 'Thou hast ravished my heart, my sister, my spouse; thou hast ravished my heart with one of thine eyes.',
        NLT: 'You have captured my heart, my treasure, my bride. You hold it hostage with one glance of your eyes.',
        NKJV: 'You have ravished my heart, my sister, my spouse; you have ravished my heart with one look of your eyes.',
      },
      activities: [
        { id: 's14-5', duration_minutes: 5, title: 'Reflect/Journal/Pray', description: 'When was the last time you felt drawn to your spouse in a strong, emotional or physical way? What sparked that feeling?', category: 'self-reflection' },
        { id: 's14-15', duration_minutes: 15, title: 'Let attraction show', description: 'Notice a moment today where you feel drawn to your spouse and allow that to show through your words or tone. Don’t overthink it.', category: 'action-with-partner' },
        { id: 's14-30', duration_minutes: 30, title: 'Make space for them to relax', description: 'Take care of something practical today so your spouse has more space to unwind. Let your action create ease for them.', category: 'action-for-partner' },
        { id: 's14-60', duration_minutes: 60, title: 'Lean into that feeling together', description: 'Take 15–20 minutes together and allow space for attraction or connection to build, whether through conversation, closeness or light touch.', category: 'action-with-partner' },
        { id: 's14-120', duration_minutes: 120, title: 'Follow that connection further', description: 'Set aside at least an hour together where you allow that sense of attraction to grow. Stay close, be present, and let intimacy develop naturally if it feels right.', category: 'action-with-partner' },
      ]
    },
    // Day 15: Love
    {
      day_number: 15,
      fruit_theme: 'Love',
      tone: 'Encouraging',
      bible_reference: 'Song of Solomon 4:10',
      bible_text: {
        NIV: 'How delightful is your love, my sister, my bride! How much more pleasing is your love than wine.',
        ESV: 'How beautiful is your love, my sister, my bride! How much better is your love than wine.',
        KJV: 'How fair is thy love, my sister, my spouse! how much better is thy love than wine!',
        NLT: 'How delightful is your love, my treasure, my bride! Your love is better than wine.',
        NKJV: 'How fair is your love, my sister, my spouse! How much better than wine is your love!',
      },
      activities: [
        { id: 's15-5', duration_minutes: 5, title: 'Reflect/Journal/Pray', description: 'Do you still savour time with your spouse, or has it become routine? What would it look like to enjoy them more intentionally?', category: 'self-reflection' },
        { id: 's15-15', duration_minutes: 15, title: 'Express enjoyment in the moment', description: 'When you notice yourself enjoying your spouse today, say it out loud rather than keeping it to yourself. Keep it simple and natural.', category: 'action-with-partner' },
        { id: 's15-30', duration_minutes: 30, title: 'Create something they enjoy', description: 'Do one thing today that you know your spouse enjoys, even if it’s small. Make the focus on their experience.', category: 'action-with-partner' },
        { id: 's15-60', duration_minutes: 60, title: 'Stay in the moment together', description: 'Take 15–20 minutes together and resist the urge to rush or move on quickly. Let yourselves enjoy the time without needing to fill it.', category: 'action-with-partner' },
        { id: 's15-120', duration_minutes: 120, title: 'Create an intentional “slow evening”', description: 'Set aside at least an hour to slow everything down, like sharing a meal, sitting together or winding down without screens, and focus fully on enjoying each other.', category: 'action-with-partner' },
      ]
    },
    // Day 16: Goodness
    {
      day_number: 16,
      fruit_theme: 'Goodness',
      tone: 'Gentle',
      bible_reference: 'Galatians 6:2',
      bible_text: {
        NIV: 'Carry each other’s burdens, and in this way you will fulfill the law of Christ.',
        ESV: 'Bear one another’s burdens, and so fulfill the law of Christ.',
        KJV: 'Bear ye one another\'s burdens, and so fulfil the law of Christ.',
        NLT: 'Share each other’s burdens, and in this way obey the law of Christ.',
        NKJV: 'Bear one another’s burdens, and so fulfill the law of Christ.',
      },
      activities: [
        { id: 's16-5', duration_minutes: 5, title: 'Reflect/Journal/Pray', description: 'Is your spouse carrying something right now that you could step into and support them with? What might that look like in a simple, practical way?', category: 'self-reflection' },
        { id: 's16-15', duration_minutes: 15, title: 'Ask what they need most', description: 'At a natural moment today, ask your spouse what would help them most right now, and listen without interrupting or jumping in with solutions.', category: 'action-with-partner' },
        { id: 's16-30', duration_minutes: 30, title: 'Take one responsibility off them', description: 'Choose one specific task your spouse is carrying and handle it for them today without being asked. Remove that weight completely.', category: 'action-for-partner' },
        { id: 's16-60', duration_minutes: 60, title: 'Create space for them to share', description: 'Take 15–20 minutes together and give your spouse your full attention to talk about what’s been on their mind. Focus on listening well.', category: 'action-for-partner' },
        { id: 's16-120', duration_minutes: 120, title: 'Support them in a meaningful way', description: 'Set aside at least an hour to either help your spouse with something important to them or be present with them in a way that genuinely lightens what they’re carrying.', category: 'action-with-partner' },
      ]
    },
    // Day 17: Admiration
    {
      day_number: 17,
      fruit_theme: 'Admiration',
      tone: 'Encouraging',
      bible_reference: 'Song of Solomon 5:10',
      bible_text: {
        NIV: 'My beloved is radiant and ruddy, outstanding among ten thousand.',
        ESV: 'My beloved is radiant and ruddy, distinguished among ten thousand.',
        KJV: 'My beloved is white and ruddy, the chiefest among ten thousand.',
        NLT: 'My lover is dark and dazzling, better than ten thousand others!',
        NKJV: 'My beloved is white and ruddy, chief among ten thousand.',
      },
      activities: [
        { id: 's17-5', duration_minutes: 5, title: 'Reflect/Journal/Pray', description: 'What makes your spouse stand out to you above everyone else? When was the last time you told them that?', category: 'self-reflection' },
        { id: 's17-15', duration_minutes: 15, title: 'Put it into words clearly', description: 'Tell your spouse what makes them stand out to you above everyone else, using your own words rather than something general.', category: 'action-with-partner' },
        { id: 's17-30', duration_minutes: 30, title: 'Do something that reflects that admiration', description: 'Choose one thoughtful action today that aligns with something you admire about your spouse, like supporting an interest or making something they enjoy.', category: 'self-reflection' },
        { id: 's17-60', duration_minutes: 60, title: 'Share what makes each other unique', description: 'Take 15–20 minutes together and talk about what makes each of you different and valuable. Keep it focused on appreciation.', category: 'action-with-partner' },
        { id: 's17-120', duration_minutes: 120, title: 'Create an experience that celebrates them', description: 'Set aside at least an hour to do something your spouse genuinely enjoys, where the focus is on them and what makes them who they are.', category: 'action-with-partner' },
      ]
    },
    // Day 18: Love
    {
      day_number: 18,
      fruit_theme: 'Love',
      tone: 'Encouraging',
      bible_reference: 'Song of Solomon 5:16',
      bible_text: {
        NIV: 'His mouth is sweetness itself; he is altogether lovely. This is my beloved, this is my friend.',
        ESV: 'His mouth is most sweet, and he is altogether desirable. This is my beloved and this is my friend.',
        KJV: 'His mouth is most sweet: yea, he is altogether lovely. This is my beloved, and this is my friend.',
        NLT: 'His mouth is sweetness itself; he is desirable in every way. Such, O women of Jerusalem, is my lover, my friend.',
        NKJV: 'His mouth is most sweet, yes, he is altogether lovely. This is my beloved, and this is my friend.',
      },
      activities: [
        { id: 's18-5', duration_minutes: 5, title: 'Reflect/Journal/Pray', description: 'Do you still see your spouse as both your partner and your friend? How do you nurture both parts of that relationship?', category: 'self-reflection' },
        { id: 's18-15', duration_minutes: 15, title: 'Acknowledge the friendship side', description: 'Let your spouse know something you appreciate about them as a friend, not just as a partner. Keep it natural and unforced.', category: 'action-with-partner' },
        { id: 's18-30', duration_minutes: 30, title: 'Do something that makes them smile', description: 'Choose one simple, thoughtful action today that would brighten your spouse’s day in a light, friendly way.', category: 'action-with-partner' },
        { id: 's18-60', duration_minutes: 60, title: 'Reconnect in a light way', description: 'Take 15–20 minutes to talk, laugh or share something easy together. Keep it light rather than turning it into a deeper discussion.', category: 'action-with-partner' },
        { id: 's18-120', duration_minutes: 120, title: 'Plan time that feels like friendship', description: 'Set aside at least an hour to do something together that feels fun, relaxed and familiar, where you can enjoy each other without pressure.', category: 'action-with-partner' },
      ]
    },
    // Day 19: Goodness
    {
      day_number: 19,
      fruit_theme: 'Goodness',
      tone: 'Encouraging',
      bible_reference: 'Romans 15:2',
      bible_text: {
        NIV: 'Each of us should please our neighbors for their good, to build them up.',
        ESV: 'Let each of us please his neighbor for his good, to build him up.',
        KJV: 'Let every one of us please his neighbour for his good to edification.',
        NLT: 'We should help others do what is right and build them up.',
        NKJV: 'Let each of us please his neighbor for his good, leading to edification.',
      },
      activities: [
        { id: 's19-5', duration_minutes: 5, title: 'Reflect/Journal/Pray', description: 'When did you last intentionally build your spouse up with your words or actions? What impact did that have?', category: 'self-reflection' },
        { id: 's19-15', duration_minutes: 15, title: 'Say something that lifts them up', description: 'Notice something about your spouse today and say something that genuinely builds them up. Keep it specific and real.', category: 'action-with-partner' },
        { id: 's19-30', duration_minutes: 30, title: 'Support something that matters to them', description: 'Do one practical thing today that helps your spouse move forward in something important to them, even in a small way.', category: 'action-with-partner' },
        { id: 's19-60', duration_minutes: 60, title: 'Encourage each other openly', description: 'Take 15–20 minutes together to share what you respect and appreciate about each other. Keep it focused on encouragement.', category: 'action-with-partner' },
        { id: 's19-120', duration_minutes: 120, title: 'Create a positive, affirming environment', description: 'Set aside at least an hour where you intentionally keep your words and tone encouraging and supportive while spending time together.', category: 'action-with-partner' },
      ]
    },
    // Day 20: Love
    {
      day_number: 20,
      fruit_theme: 'Love',
      tone: 'Encouraging',
      bible_reference: 'Song of Solomon 6:3',
      bible_text: {
        NIV: 'I am my beloved’s and my beloved is mine; he browses among the lilies.',
        ESV: 'I am my beloved’s and my beloved is mine; he grazes among the lilies.',
        KJV: 'I am my beloved\'s, and my beloved is mine: he feedeth among the lilies.',
        NLT: 'I am my lover’s, and he claims me as his own. He feeds among the lilies.',
        NKJV: 'I am my beloved’s, and my beloved is mine. He feeds his flock among the lilies.',
      },
      activities: [
        { id: 's20-5', duration_minutes: 5, title: 'Reflect/Journal/Pray', description: 'Do you feel a strong sense of “us” in your relationship right now? If not, what might help rebuild that feeling?', category: 'self-reflection' },
        { id: 's20-15', duration_minutes: 15, title: 'Reinforce your connection in words', description: 'Let your spouse know something you value about being together as a couple and what “us” means to you right now.', category: 'action-with-partner' },
        { id: 's20-30', duration_minutes: 30, title: 'Create something that strengthens your “us”', description: 'Do one practical thing today that benefits your life as a couple, like organising something shared or preparing for time together later.', category: 'action-with-partner' },
        { id: 's20-60', duration_minutes: 60, title: 'Check in on your connection', description: 'Take 15–20 minutes together to talk about how connected you’ve been feeling and what helps you feel close. Keep it open and relaxed.', category: 'action-with-partner' },
        { id: 's20-120', duration_minutes: 120, title: 'Do something as a team', description: 'Set aside at least an hour to do something together that requires you to operate as a team, like planning, organising or creating something shared.', category: 'action-with-partner' },
      ]
    },
    // Day 21: Love
    {
      day_number: 21,
      fruit_theme: 'Love',
      tone: 'Encouraging',
      bible_reference: 'Song of Solomon 7:6',
      bible_text: {
        NIV: 'How beautiful you are and how pleasing, my love, with your delights!',
        ESV: 'How beautiful and pleasant you are, O loved one, with all your delights!',
        KJV: 'How fair and how pleasant art thou, O love, for delights!',
        NLT: 'Oh, how beautiful you are! How pleasing, my love, how full of delights!',
        NKJV: 'How fair and how pleasant you are, O love, with your delights!',
      },
      activities: [
        { id: 's21-5', duration_minutes: 5, title: 'Reflect/Journal/Pray', description: 'Do you still see your spouse as desirable and pleasing, or has familiarity dulled that for you? What would it look like to intentionally notice and appreciate them again?', category: 'self-reflection' },
        { id: 's21-15', duration_minutes: 15, title: 'Let your attraction show', description: 'Notice something about your spouse today that you find attractive or pleasing and express it in a natural, genuine way.', category: 'action-with-partner' },
        { id: 's21-30', duration_minutes: 30, title: 'Do something that makes them feel desired', description: 'Take a small action today that makes your spouse feel wanted, like creating a moment for them to relax or setting up something they enjoy.', category: 'action-for-partner' },
        { id: 's21-60', duration_minutes: 60, title: 'Create a moment of physical closeness', description: 'Take 15–20 minutes to sit or lie close together and allow touch to be part of the moment, whether that’s holding each other or a longer kiss.', category: 'action-with-partner' },
        { id: 's21-120', duration_minutes: 120, title: 'Lean into desire together', description: 'Set aside at least an hour to be together in a relaxed, private space where you can enjoy being close and allow that attraction to build into deeper intimacy if it feels natural.', category: 'action-with-partner' },
      ]
    },
    // Day 22: Self-control
    {
      day_number: 22,
      fruit_theme: 'Self-control',
      tone: 'Gentle',
      bible_reference: 'Proverbs 19:11',
      bible_text: {
        NIV: 'A person’s wisdom yields patience; it is to one’s glory to overlook an offense.',
        ESV: 'Good sense makes one slow to anger, and it is his glory to overlook an offense.',
        KJV: 'The discretion of a man deferreth his anger; and it is his glory to pass over a transgression.',
        NLT: 'Sensible people control their temper; they earn respect by overlooking wrongs.',
        NKJV: 'The discretion of a man makes him slow to anger, and his glory is to overlook a transgression.',
      },
      activities: [
        { id: 's22-5', duration_minutes: 5, title: 'Reflect/Journal/Pray', description: 'Are there moments where you hold onto frustration or take offense more quickly than you need to? What would it look like to let that go more often?', category: 'self-reflection' },
        { id: 's22-15', duration_minutes: 15, title: 'Choose to let something go', description: 'Notice a moment today where you could take offense and consciously choose to let it pass without reacting.', category: 'action-with-partner' },
        { id: 's22-30', duration_minutes: 30, title: 'Create a smoother moment for them', description: 'Do one practical thing today that prevents friction or makes your spouse’s day easier, even if it’s something small.', category: 'action-for-partner' },
        { id: 's22-60', duration_minutes: 60, title: 'Talk about how you handle frustration', description: 'Take 15–20 minutes together to share how you each respond to frustration and what helps you stay calm. Keep it honest but respectful.', category: 'action-with-partner' },
        { id: 's22-120', duration_minutes: 120, title: 'Create a calm, low-pressure evening', description: 'Set aside at least an hour together where the focus is on staying relaxed and not reacting quickly. Keep things light and let small things go.', category: 'action-with-partner' },
      ]
    },
    // Day 23: Love
    {
      day_number: 23,
      fruit_theme: 'Love',
      tone: 'Encouraging',
      bible_reference: 'Song of Solomon 7:10',
      bible_text: {
        NIV: 'I belong to my beloved, and his desire is for me.',
        ESV: 'I am my beloved’s, and his desire is for me.',
        KJV: 'I am my beloved\'s, and his desire is toward me.',
        NLT: 'I am my lover’s, and he claims me as his own.',
        NKJV: 'I am my beloved’s, and his desire is toward me.',
      },
      activities: [
        { id: 's23-5', duration_minutes: 5, title: 'Reflect/Journal/Pray', description: 'Do you feel desired by your spouse, and do they feel desired by you? If that has faded, what part have you played in that shift?', category: 'self-reflection' },
        { id: 's23-15', duration_minutes: 15, title: 'Express desire directly', description: 'Tell your spouse in a simple and natural way that you desire them or enjoy being close to them. Keep it real rather than overthought.', category: 'action-with-partner' },
        { id: 's23-30', duration_minutes: 30, title: 'Make space for connection later', description: 'Handle something practical today so you both have more time or energy to connect later. Remove a barrier.', category: 'action-with-partner' },
        { id: 's23-60', duration_minutes: 60, title: 'Stay close and connected', description: 'Take 15–20 minutes to be physically close, whether sitting, holding each other or sharing a moment without distractions.', category: 'action-with-partner' },
        { id: 's23-120', duration_minutes: 120, title: 'Create time for intimacy', description: 'Set aside at least an hour where you can be alone together without interruptions. Stay present, build closeness through touch, and allow intimacy or sex to develop naturally if it feels right.', category: 'action-with-partner' },
      ]
    },
    // Day 24: Self-control
    {
      day_number: 24,
      fruit_theme: 'Self-control',
      tone: 'Gentle',
      bible_reference: 'Psalm 37:8',
      bible_text: {
        NIV: 'Refrain from anger and turn from wrath; do not fret—it leads only to evil.',
        ESV: 'Refrain from anger, and forsake wrath! Fret not yourself; it tends only to evil.',
        KJV: 'Cease from anger, and forsake wrath: fret not thyself in any wise to do evil.',
        NLT: 'Stop being angry! Turn from your rage! Do not lose your temper—it only leads to harm.',
        NKJV: 'Cease from anger, and forsake wrath; do not fret—it only causes harm.',
      },
      activities: [
        { id: 's24-5', duration_minutes: 5, title: 'Reflect/Journal/Pray', description: 'When you feel frustration rise toward your spouse, how do you usually respond? What would it look like to pause and choose a different response in that moment?', category: 'self-reflection' },
        { id: 's24-15', duration_minutes: 15, title: 'Pause before reacting', description: 'When you feel frustration rise today, take a breath and choose your response rather than reacting immediately.', category: 'action-with-partner' },
        { id: 's24-30', duration_minutes: 30, title: 'Create space for a smoother day', description: 'Do something practical today that reduces pressure or tension in your shared environment. Think ahead and remove a trigger.', category: 'action-with-partner' },
        { id: 's24-60', duration_minutes: 60, title: 'Reflect on how you respond', description: 'Take 15–20 minutes together to talk about how you each handle frustration and what helps you pause rather than react.', category: 'self-reflection' },
        { id: 's24-120', duration_minutes: 120, title: 'Create a steady, calm space', description: 'Set aside at least an hour together where the focus is on being steady and present. Keep your tone calm and your responses intentional throughout your time together.', category: 'action-with-partner' },
      ]
    },
    // Day 25: Joy
    {
      day_number: 25,
      fruit_theme: 'Joy',
      tone: 'Encouraging',
      bible_reference: 'Song of Solomon 7:12',
      bible_text: {
        NIV: 'Let us go early to the vineyards to see if the vines have budded.',
        ESV: 'let us go out early to the vineyards and see whether the vines have budded.',
        KJV: 'Let us get up early to the vineyards; let us see if the vine flourish.',
        NLT: 'Let us get up early and go to the vineyards to see if the grapevines have budded.',
        NKJV: 'Let us get up early to the vineyards; let us see if the vine has budded.',
      },
      activities: [
        { id: 's25-5', duration_minutes: 5, title: 'Reflect/Journal/Pray', description: 'When was the last time you intentionally created space to connect with your spouse, away from routine and responsibility? What tends to get in the way of that?', category: 'self-reflection' },
        { id: 's25-15', duration_minutes: 15, title: 'Express enjoyment of your time together', description: 'Take a moment today to tell your spouse something you genuinely enjoy about the time you spend together. Keep it simple and in-the-moment.', category: 'action-with-partner' },
        { id: 's25-30', duration_minutes: 30, title: 'Make it easier to step away', description: 'Take care of something practical today so you can both step away from responsibilities more easily later.', category: 'action-with-partner' },
        { id: 's25-60', duration_minutes: 60, title: 'Step out of routine briefly', description: 'Take 15–20 minutes to step away from your usual routine together, even if it’s just going outside or changing environment.', category: 'action-with-partner' },
        { id: 's25-120', duration_minutes: 120, title: 'Create a simple “escape” together', description: 'Set aside at least an hour to step away from your normal environment or routine. Go somewhere or create a different atmosphere so it feels like intentional time together.', category: 'action-with-partner' },
      ]
    },
    // Day 26: Love
    {
      day_number: 26,
      fruit_theme: 'Love',
      tone: 'Encouraging',
      bible_reference: '1 Peter 4:8',
      bible_text: {
        NIV: 'Above all, love each other deeply, because love covers over a multitude of sins.',
        ESV: 'Above all, keep loving one another earnestly, since love covers a multitude of sins.',
        KJV: 'And above all things have fervent charity among yourselves: for charity shall cover the multitude of sins.',
        NLT: 'Most important of all, continue to show deep love for each other, for love covers a multitude of sins.',
        NKJV: 'And above all things have fervent love for one another, for love will cover a multitude of sins.',
      },
      activities: [
        { id: 's26-5', duration_minutes: 5, title: 'Reflect/Journal/Pray', description: 'Has there been a time recently where you said something negative about your spouse to somebody else? If so, what could you have said instead, to have integrity in your speech about them?', category: 'self-reflection' },
        { id: 's26-15', duration_minutes: 15, title: 'Choose your words carefully today', description: 'Be intentional about how you speak about your spouse today, both to them and about them. Choose words that reflect respect and love.', category: 'action-with-partner' },
        { id: 's26-30', duration_minutes: 30, title: 'Do something that shows loyalty in action', description: 'Take one practical step today that demonstrates you are for your spouse, like supporting them in front of others or handling something on their behalf.', category: 'action-for-partner' },
        { id: 's26-60', duration_minutes: 60, title: 'Have an honest but kind conversation', description: 'Take 15–20 minutes together to talk about how you both feel when spoken about positively or negatively. Keep it respectful and grounded.', category: 'action-with-partner' },
        { id: 's26-120', duration_minutes: 120, title: 'Create a space of trust and respect', description: 'Set aside at least an hour together where you are intentional about speaking well of each other and reinforcing trust through your words and tone.', category: 'action-with-partner' },
      ]
    },
    // Day 27: Love
    {
      day_number: 27,
      fruit_theme: 'Love',
      tone: 'Encouraging',
      bible_reference: 'Song of Solomon 8:6',
      bible_text: {
        NIV: 'Place me like a seal over your heart, like a seal on your arm; for love is as strong as death.',
        ESV: 'Set me as a seal upon your heart, as a seal upon your arm, for love is strong as death.',
        KJV: 'Set me as a seal upon thine heart, as a seal upon thine arm: for love is strong as death.',
        NLT: 'Place me like a seal over your heart, like a seal on your arm. For love is as strong as death.',
        NKJV: 'Set me as a seal upon your heart, as a seal upon your arm; for love is as strong as death.',
      },
      activities: [
        { id: 's27-5', duration_minutes: 5, title: 'Reflect/Journal/Pray', description: 'How deeply committed do you feel to your spouse right now, not just in words but in your actions and focus? Where might your attention be divided?', category: 'self-reflection' },
        { id: 's27-15', duration_minutes: 15, title: 'Reaffirm your commitment in words', description: 'Share something with your spouse that reflects your commitment to them, not just in general terms but in how you choose them daily.', category: 'action-with-partner' },
        { id: 's27-30', duration_minutes: 30, title: 'Do something that shows you’re all in', description: 'Take one practical action today that reflects commitment, like prioritising something important to them or following through on something you’ve said.', category: 'action-with-partner' },
        { id: 's27-60', duration_minutes: 60, title: 'Talk about what commitment looks like', description: 'Take 15–20 minutes together to share what commitment means to each of you in everyday life. Keep it real and grounded.', category: 'action-with-partner' },
        { id: 's27-120', duration_minutes: 120, title: 'Create time that reflects priority', description: 'Set aside at least an hour where your spouse is clearly your priority. Remove distractions and give them your full attention through your presence and focus.', category: 'self-reflection' },
      ]
    },
    // Day 28: Faithfulness
    {
      day_number: 28,
      fruit_theme: 'Faithfulness',
      tone: 'Encouraging',
      bible_reference: 'Ruth 1:16',
      bible_text: {
        NIV: 'Where you go I will go, and where you stay I will stay. Your people will be my people and your God my God.',
        ESV: 'Where you go I will go, and where you lodge I will lodge. Your people shall be my people, and your God my God.',
        KJV: 'Whither thou goest, I will go; and where thou lodgest, I will lodge: thy people shall be my people, and thy God my God.',
        NLT: 'Where you go I will go, and where you live I will live. Your people will be my people, and your God will be my God.',
        NKJV: 'Where you go, I will go; and where you lodge, I will lodge; Your people shall be my people, and your God, my God.',
      },
      activities: [
        { id: 's28-5', duration_minutes: 5, title: 'Reflect/Journal/Pray', description: 'How could you show your spouse that you love them unconditionally? How can you show them they are your one and only?', category: 'self-reflection' },
        { id: 's28-15', duration_minutes: 15, title: 'Put loyalty into words', description: 'Express to your spouse in a simple way that you are with them, on their side, and committed to walking life alongside them.', category: 'action-with-partner' },
        { id: 's28-30', duration_minutes: 30, title: 'Support their world in a practical way', description: 'Do something today that supports your spouse’s life or responsibilities, like helping with something important to them or stepping into their world.', category: 'action-with-partner' },
        { id: 's28-60', duration_minutes: 60, title: 'Share what “being a team” means', description: 'Take 15–20 minutes together to talk about how you show up as a team and where you could strengthen that. Keep it honest but encouraging.', category: 'action-with-partner' },
        { id: 's28-120', duration_minutes: 120, title: 'Do something that strengthens your bond', description: 'Set aside at least an hour to do something together that reinforces your sense of partnership, whether that’s planning, supporting each other or simply being present as a team.', category: 'action-with-partner' },
      ]
    },
    // Day 29: Love
    {
      day_number: 29,
      fruit_theme: 'Love',
      tone: 'Gentle',
      bible_reference: 'Colossians 3:14',
      bible_text: {
        NIV: 'And over all these virtues put on love, which binds them all together in perfect unity.',
        ESV: 'And above all these put on love, which binds everything together in perfect harmony.',
        KJV: 'And above all these things put on charity, which is the bond of perfectness.',
        NLT: 'Above all, clothe yourselves with love, which binds us all together in perfect harmony.',
        NKJV: 'But above all these things put on love, which is the bond of perfection.',
      },
      activities: [
        { id: 's29-5', duration_minutes: 5, title: 'Reflect/Journal/Pray', description: 'What does it actually look like, in your daily life, to “put on love” with your spouse? Where are you doing this well, and where could you step into it more intentionally?', category: 'self-reflection' },
        { id: 's29-15', duration_minutes: 15, title: 'Be intentional in how you show love', description: 'Choose one way today to actively “put on love” in your behaviour, whether through patience, kindness or gentleness, and express that to your spouse.', category: 'action-with-partner' },
        { id: 's29-30', duration_minutes: 30, title: 'Make their day easier again', description: 'Look for one practical way today to ease pressure for your spouse or take something off their plate without being asked.', category: 'action-for-partner' },
        { id: 's29-60', duration_minutes: 60, title: 'Reflect on what love looks like in action', description: 'Take 15–20 minutes together to talk about how love shows up in your daily lives and what it looks like in real situations.', category: 'self-reflection' },
        { id: 's29-120', duration_minutes: 120, title: 'Create a peaceful, unified space', description: 'Set aside at least an hour together where you focus on being calm, connected and unified. Let your actions and tone reflect love throughout your time together.', category: 'action-with-partner' },
      ]
    },
    // Day 30: Love
    {
      day_number: 30,
      fruit_theme: 'Love',
      tone: 'Encouraging',
      bible_reference: 'John 15:12',
      bible_text: {
        NIV: 'My command is this: Love each other as I have loved you.',
        ESV: 'This is my commandment, that you love one another as I have loved you.',
        KJV: 'This is my commandment, That ye love one another, as I have loved you.',
        NLT: 'This is my commandment: Love each other in the same way I have loved you.',
        NKJV: 'This is My commandment, that you love one another as I have loved you.',
      },
      activities: [
        { id: 's30-5', duration_minutes: 5, title: 'Reflect/Journal/Pray', description: 'Does your spouse know the depth of your love for them? Like, REALLY know? What have you said or done lately to show them that?', category: 'self-reflection' },
        { id: 's30-15', duration_minutes: 15, title: 'Say something that shows depth of love', description: 'Share something meaningful with your spouse that reflects the depth of your love for them. Let it go beyond surface-level words.', category: 'action-for-partner' },
        { id: 's30-30', duration_minutes: 30, title: 'Do something that reflects sacrificial love', description: 'Take one practical action today that puts your spouse first, even if it costs you time or effort.', category: 'self-reflection' },
        { id: 's30-60', duration_minutes: 60, title: 'Show appreciation openly', description: 'Take 15–20 minutes together to express appreciation and gratitude for each other and the relationship you’ve built.', category: 'action-with-partner' },
        { id: 's30-120', duration_minutes: 120, title: 'Create a meaningful moment together', description: 'Set aside at least an hour to intentionally mark this moment in your relationship. Do something that feels significant to both of you, and include closeness, affection or intimacy in a way that feels natural.', category: 'action-with-partner' },
      ]
    }
  ]
,
  repair: [
    // Day 1: Gentleness
    {
      day_number: 1,
      fruit_theme: 'Gentleness',
      tone: 'Gentle',
      bible_reference: 'Proverbs 15:1',
      bible_text: {
        NIV: 'A gentle answer turns away wrath, but a harsh word stirs up anger.',
        NLT: 'A gentle answer deflects anger, but harsh words make tempers flare.',
        ESV: 'A soft answer turns away wrath, but a harsh word stirs up anger.',
        KJV: 'A soft answer turneth away wrath: but grievous words stir up anger.',
        NKJV: 'A soft answer turns away wrath, but a harsh word stirs up anger.',
      },
      activities: [
        { id: 'r1-5', duration_minutes: 5, title: 'Pray', description: 'Pray for a softer heart today. Ask God to help your words land gently. Pray your spouse feels something shift, even in small ways. Ask for gentleness to come from Him, not just from effort.', category: 'self-reflection' },
        { id: 'r1-15', duration_minutes: 15, title: 'Say one gentle sentence', description: 'Find a moment today to say: "I\'d love for things to feel calmer between us." Say it simply and leave it there.', category: 'action-with-partner' },
        { id: 'r1-30', duration_minutes: 30, title: 'Lower the load', description: 'Do one small task for your spouse without being asked. Make a drink, tidy something, handle one job. No announcement needed.', category: 'action-for-partner' },
        { id: 'r1-60', duration_minutes: 60, title: 'What helps you feel heard', description: 'Ask: "What helps you feel heard when things are tense?" One answer each. If it feels charged, stop and come back later.', category: 'action-with-partner' },
        { id: 'r1-120', duration_minutes: 120, title: 'Walk somewhere easy', description: 'Go for a walk and keep the conversation light — a good memory, something you\'re looking forward to. Just be side by side.', category: 'action-with-partner' },
      ]
    },
    // Day 2: Faithfulness
    {
      day_number: 2,
      fruit_theme: 'Faithfulness',
      tone: 'Encouraging',
      bible_reference: 'Proverbs 3:3–4',
      bible_text: {
        NIV: 'Let love and faithfulness never leave you; bind them around your neck, write them on the tablet of your heart. Then you will win favor and a good name in the sight of God and man.',
        NLT: 'Never let loyalty and kindness leave you! Tie them around your neck as a reminder. Write them deep within your heart. Then you will find favor with both God and people, and you will earn a good reputation.',
        ESV: 'Let not steadfast love and faithfulness forsake you; bind them around your neck; write them on the tablet of your heart. So you will find favor and good success in the sight of God and man.',
        KJV: 'Let not mercy and truth forsake thee: bind them about thy neck; write them upon the table of thine heart: So shalt thou find favour and good understanding in the sight of God and man.',
        NKJV: 'Let not mercy and truth forsake you; bind them around your neck, write them on the tablet of your heart, and so find favor and high esteem in the sight of God and man.',
      },
      activities: [
        { id: 'r2-5', duration_minutes: 5, title: 'Journal', description: 'Love and faithfulness are things you carry, not just feel. What does carrying both look like in your marriage right now? What would it mean to let them stay?', category: 'self-reflection' },
        { id: 'r2-15', duration_minutes: 15, title: 'Send a simple reassurance', description: 'Send your spouse a message: "I\'ve been thinking about us — I just want you to know I care about what we have." No expectation of a response needed.', category: 'action-with-partner' },
        { id: 'r2-30', duration_minutes: 30, title: 'Show up consistently', description: 'Follow through on one thing you said you would do, or finish one small task without being reminded. Steadiness speaks.', category: 'action-for-partner' },
        { id: 'r2-60', duration_minutes: 60, title: 'A simple check-in', description: 'Ask: "What has your day been like?" Listen fully, no fixing or advising. Keep it easy.', category: 'action-with-partner' },
        { id: 'r2-120', duration_minutes: 120, title: 'A themed dinner night', description: 'Pick a simple theme — Italian, Mexican, a childhood favourite — and eat together. The aim is something shared that feels enjoyable.', category: 'action-with-partner' },
      ]
    },
    // Day 3: Love
    {
      day_number: 3,
      fruit_theme: 'Love',
      tone: 'Gentle',
      bible_reference: 'Romans 12:10',
      bible_text: {
        NIV: 'Be devoted to one another in love. Honor one another above yourselves.',
        NLT: 'Love each other with genuine affection, and take delight in honoring each other.',
        ESV: 'Love one another with brotherly affection. Outdo one another in showing honor.',
        KJV: 'Be kindly affectioned one to another with brotherly love; in honour preferring one another;',
        NKJV: 'Be kindly affectionate to one another with brotherly love, in honor giving preference to one another;',
      },
      activities: [
        { id: 'r3-5', duration_minutes: 5, title: 'Pray', description: 'Pray that God softens your reactions today. Ask that your spouse feels respected by you, even in small moments. Pray for a marriage that becomes a place of safety and honour.', category: 'self-reflection' },
        { id: 'r3-15', duration_minutes: 15, title: 'Say something honouring', description: 'Say to your spouse: "I don\'t say this enough, but I do respect you." Let it land without adding to it.', category: 'action-with-partner' },
        { id: 'r3-30', duration_minutes: 30, title: 'One honouring act', description: 'Give your spouse preference in something small today — let them choose, take over a task, or help before they ask.', category: 'action-with-partner' },
        { id: 'r3-60', duration_minutes: 60, title: 'What respect looks like', description: 'Ask: "What makes you feel respected by me?" One example each. Listen without interrupting or correcting.', category: 'action-with-partner' },
        { id: 'r3-120', duration_minutes: 120, title: 'Let them choose', description: 'Invite your spouse to choose something simple for the two of you tonight and go along with it willingly.', category: 'action-with-partner' },
      ]
    },
    // Day 4: Kindness
    {
      day_number: 4,
      fruit_theme: 'Kindness',
      tone: 'Gentle',
      bible_reference: 'Proverbs 16:24',
      bible_text: {
        NIV: 'Gracious words are a honeycomb, sweet to the soul and healing to the bones.',
        NLT: 'Kind words are like honey—sweet to the soul and healthy for the body.',
        ESV: 'Gracious words are like a honeycomb, sweetness to the soul and health to the body.',
        KJV: 'Pleasant words are as an honeycomb, sweet to the soul, and health to the bones.',
        NKJV: 'Pleasant words are like a honeycomb, sweetness to the soul and health to the bones.',
      },
      activities: [
        { id: 'r4-5', duration_minutes: 5, title: 'Reflect', description: 'Your words have more power than you realise. Think about the last few days — where could kindness in your tone have changed the atmosphere between you?', category: 'self-reflection' },
        { id: 'r4-15', duration_minutes: 15, title: 'Leave a kind note', description: 'Leave a short note or send a message: "I really appreciate you, even when I don\'t say it." Leave it with no strings attached.', category: 'action-with-partner' },
        { id: 'r4-30', duration_minutes: 30, title: 'One softening act', description: 'Make tea, fold washing, prepare something ahead of time. A small act that makes their day feel easier.', category: 'action-for-partner' },
        { id: 'r4-60', duration_minutes: 60, title: 'Words that feel safe', description: 'Ask: "What kinds of words help you feel valued?" A few examples each. Keep the focus on what works.', category: 'action-with-partner' },
        { id: 'r4-120', duration_minutes: 120, title: 'A relaxed outdoor moment', description: 'Sit outside together with a drink or snack. No agenda. The aim is to unwind in each other\'s presence.', category: 'action-with-partner' },
      ]
    },
    // Day 5: Joy
    {
      day_number: 5,
      fruit_theme: 'Joy',
      tone: 'Encouraging',
      bible_reference: '1 Thessalonians 5:11',
      bible_text: {
        NIV: 'Therefore encourage one another and build each other up, just as in fact you are doing.',
        NLT: 'So encourage each other and build each other up, just as you are already doing.',
        ESV: 'Therefore encourage one another and build one another up, just as you are doing.',
        KJV: 'Wherefore comfort yourselves together, and edify one another, even as also ye do.',
        NKJV: 'Therefore comfort each other and edify one another, just as you also are doing.',
      },
      activities: [
        { id: 'r5-5', duration_minutes: 5, title: 'Journal', description: 'Think of a time your spouse encouraged you and it stayed with you. What made it land? What do you know about them that they may need to hear right now?', category: 'self-reflection' },
        { id: 'r5-15', duration_minutes: 15, title: 'Say one encouraging thing', description: 'Say something specific: "I really appreciate this about you…" Keep it genuine and grounded in something real.', category: 'action-with-partner' },
        { id: 'r5-30', duration_minutes: 30, title: 'Back it up with action', description: 'Do one practical thing that supports your spouse, especially where they seem tired or stretched.', category: 'action-with-partner' },
        { id: 'r5-60', duration_minutes: 60, title: 'Share what\'s been heavy', description: 'Ask gently: "What\'s one thing that\'s been weighing on you lately?" One answer each. Respond with encouragement only.', category: 'action-with-partner' },
        { id: 'r5-120', duration_minutes: 120, title: 'Watch something nostalgic', description: 'Choose a film or show you both used to enjoy. The aim is to reconnect through something familiar and low pressure.', category: 'action-with-partner' },
      ]
    },
    // Day 6: Self-control
    {
      day_number: 6,
      fruit_theme: 'Self-control',
      tone: 'Gentle',
      bible_reference: 'James 1:19',
      bible_text: {
        NIV: 'Everyone should be quick to listen, slow to speak and slow to become angry.',
        NLT: 'Understand this, my dear brothers and sisters: You must all be quick to listen, slow to speak, and slow to get angry.',
        ESV: 'Know this, my beloved brothers: let every person be quick to hear, slow to speak, slow to anger;',
        KJV: 'Wherefore, my beloved brethren, let every man be swift to hear, slow to speak, slow to wrath:',
        NKJV: 'So then, my beloved brethren, let every man be swift to hear, slow to speak, slow to wrath;',
      },
      activities: [
        { id: 'r6-5', duration_minutes: 5, title: 'Journal', description: 'Where does the urge to speak before you\'ve fully listened show up most in your marriage? What would one small change in that pattern look like today?', category: 'self-reflection' },
        { id: 'r6-15', duration_minutes: 15, title: 'Send a calm message', description: 'Send a message: "I\'d love for things to feel calmer between us. I\'m working on my part in that."', category: 'action-with-partner' },
        { id: 'r6-30', duration_minutes: 30, title: 'Reduce pressure for them', description: 'Take one small responsibility off your spouse today so they have one less thing to carry.', category: 'action-for-partner' },
        { id: 'r6-60', duration_minutes: 60, title: 'Listen without interrupting', description: 'Ask: "What\'s something that\'s been on your mind?" Let them speak fully before you respond.', category: 'action-with-partner' },
        { id: 'r6-120', duration_minutes: 120, title: 'A purpose-driven outing', description: 'Drive somewhere for dessert or coffee. The aim is easy time together with a sense of going somewhere.', category: 'action-with-partner' },
      ]
    },
    // Day 7: Goodness
    {
      day_number: 7,
      fruit_theme: 'Goodness',
      tone: 'Gentle',
      bible_reference: 'Philippians 2:4',
      bible_text: {
        NIV: 'Be not looking to your own interests but each of you to the interests of the others.',
        NLT: "Don't look out only for your own interests, but take an interest in others, too.",
        ESV: 'Let each of you look not only to his own interests, but also to the interests of others.',
        KJV: 'Look not every man on his own things, but every man also on the things of others.',
        NKJV: 'Let each of you look out not only for his own interests, but also for the interests of others.',
      },
      activities: [
        { id: 'r7-5', duration_minutes: 5, title: 'Reflect', description: 'What is your spouse carrying right now that you haven\'t fully noticed? What would it look like to turn your attention toward them today, even in one small way?', category: 'self-reflection' },
        { id: 'r7-15', duration_minutes: 15, title: 'Ask one simple question', description: 'Ask gently: "How are you feeling today?" Allow that to be enough. No fixing needed.', category: 'action-with-partner' },
        { id: 'r7-30', duration_minutes: 30, title: 'Put them first', description: 'Choose one practical action today that puts your spouse\'s needs ahead of your own.', category: 'action-with-partner' },
        { id: 'r7-60', duration_minutes: 60, title: 'Ask about their needs', description: 'Ask: "What\'s one small thing that would make today feel easier for you?" Listen and act if you can.', category: 'action-with-partner' },
        { id: 'r7-120', duration_minutes: 120, title: 'Try something they enjoy', description: 'Spend time doing something your spouse enjoys and stay curious about it. Show interest in what matters to them.', category: 'action-with-partner' },
      ]
    },
    // Day 8: Peace
    {
      day_number: 8,
      fruit_theme: 'Peace',
      tone: 'Encouraging',
      bible_reference: 'Ecclesiastes 4:9',
      bible_text: {
        NIV: 'Two are better than one, because they have a good return for their labor.',
        NLT: 'Two people are better off than one, for they can help each other succeed.',
        ESV: 'Two are better than one, because they have a good reward for their toil.',
        KJV: 'Two are better than one; because they have a good reward for their labour.',
        NKJV: 'Two are better than one, because they have a good reward for their labor.',
      },
      activities: [
        { id: 'r8-5', duration_minutes: 5, title: 'Journal', description: 'What is your spouse carrying right now that you could help with? Write about what being a genuine support to them looks like in this season.', category: 'self-reflection' },
        { id: 'r8-15', duration_minutes: 15, title: 'Offer support in words', description: 'Say: "If you need anything today, I\'m here." Leave it open and pressure-free.', category: 'action-with-partner' },
        { id: 'r8-30', duration_minutes: 30, title: 'Take something off their plate', description: 'Notice something your spouse is handling and take care of it without being asked.', category: 'action-for-partner' },
        { id: 'r8-60', duration_minutes: 60, title: 'Ask where support is needed', description: 'Ask: "What feels hardest for you right now?" Focus on understanding. Keep responses short and calm.', category: 'action-with-partner' },
        { id: 'r8-120', duration_minutes: 120, title: 'Tidy together, then rest', description: 'Spend time sorting or tidying one space together, then sit down with a drink or treat. Teamwork, then reward.', category: 'action-with-partner' },
      ]
    },
    // Day 9: Love
    {
      day_number: 9,
      fruit_theme: 'Love',
      tone: 'Encouraging',
      bible_reference: 'Ephesians 5:2',
      bible_text: {
        NIV: '...and walk in the way of love, just as Christ loved us and gave himself up for us as a fragrant offering and sacrifice to God.',
        NLT: 'Live a life filled with love, following the example of Christ. He loved us and offered himself as a sacrifice for us, a pleasing aroma to God.',
        ESV: 'And walk in love, as Christ loved us and gave himself up for us, a fragrant offering and sacrifice to God.',
        KJV: 'And walk in love, as Christ also hath loved us, and hath given himself for us an offering and a sacrifice to God for a sweetsmelling savour.',
        NKJV: 'And walk in love, as Christ also has loved us and given Himself for us, an offering and a sacrifice to God for a sweet-smelling aroma.',
      },
      activities: [
        { id: 'r9-5', duration_minutes: 5, title: 'Pray', description: 'Pray that God grows compassion in you for your spouse. Ask that your spouse feels supported through you today. Pray for your marriage to become a place of genuine partnership.', category: 'self-reflection' },
        { id: 'r9-15', duration_minutes: 15, title: 'Send a thoughtful message', description: 'Send a message: "I\'ve been thinking about you today — hope you\'re doing okay."', category: 'action-with-partner' },
        { id: 'r9-30', duration_minutes: 30, title: 'Remove a distraction', description: 'Put your phone away when you\'re with your spouse today. Full presence is its own act of love.', category: 'action-with-partner' },
        { id: 'r9-60', duration_minutes: 60, title: 'When have we felt connected', description: 'Ask: "When have we felt most connected lately?" One example each. Stay focused on what has worked.', category: 'action-with-partner' },
        { id: 'r9-120', duration_minutes: 120, title: 'Go out for something simple', description: 'Head out for coffee or dessert and sit together for a while. Easy time outside your normal routine.', category: 'action-with-partner' },
      ]
    },
    // Day 10: Self-control
    {
      day_number: 10,
      fruit_theme: 'Self-control',
      tone: 'Gentle',
      bible_reference: 'Proverbs 25:28',
      bible_text: {
        NIV: 'Like a city whose walls are broken through is a person who lacks self-control.',
        NLT: 'A person without self-control is like a city with broken-down walls.',
        ESV: 'A man without self-control is like a city broken into and left without walls.',
        KJV: 'He that hath no rule over his own spirit is like a city that is broken down, and without walls.',
        NKJV: 'Whoever has no rule over his own spirit is like a city broken down, without walls.',
      },
      activities: [
        { id: 'r10-5', duration_minutes: 5, title: 'Reflect', description: 'A city without walls has no protection. Where in your marriage have your reactions left things exposed? What would one steadier response look like this week?', category: 'self-reflection' },
        { id: 'r10-15', duration_minutes: 15, title: 'Use one steady phrase', description: 'In conversation today, say: "I hear you" or "That makes sense" — even when you don\'t fully agree.', category: 'action-with-partner' },
        { id: 'r10-30', duration_minutes: 30, title: 'Calm one shared space', description: 'Tidy or organise one area you both use. A calmer environment reflects and reinforces a calmer mind.', category: 'action-with-partner' },
        { id: 'r10-60', duration_minutes: 60, title: 'What steadies things between us', description: 'Ask: "What helps things feel more settled between us?" One answer each. Keep it forward-facing.', category: 'action-with-partner' },
        { id: 'r10-120', duration_minutes: 120, title: 'A cosy night in', description: 'Change into comfortable clothes, get snacks, watch something together. The aim is to feel easy and settled.', category: 'action-with-partner' },
      ]
    },
    // Day 11: Gentleness
    {
      day_number: 11,
      fruit_theme: 'Gentleness',
      tone: 'Gentle',
      bible_reference: 'Philippians 4:5',
      bible_text: {
        NIV: 'Let your gentleness be evident to all. The Lord is near.',
        NLT: 'Let everyone see that you are considerate in all you do. Remember, the Lord is coming soon.',
        ESV: 'Let your reasonableness be known to everyone. The Lord is at hand;',
        KJV: 'Let your moderation be known unto all men. The Lord is at hand.',
        NKJV: 'Let your gentleness be known to all men. The Lord is at hand.',
      },
      activities: [
        { id: 'r11-5', duration_minutes: 5, title: 'Journal', description: 'When frustration rises toward your spouse, what does it usually look like? Write about one pattern you\'ve noticed and what a gentler version of that response could be.', category: 'self-reflection' },
        { id: 'r11-15', duration_minutes: 15, title: 'Share something small', description: 'In a calm moment, say: "I realised I didn\'t tell you this…" and share something small and honest.', category: 'action-with-partner' },
        { id: 'r11-30', duration_minutes: 30, title: 'Show gentleness in action', description: 'Slow down in one interaction today. Handle something with extra care. Let gentleness show in how you move and respond.', category: 'action-with-partner' },
        { id: 'r11-60', duration_minutes: 60, title: 'Share something you held back', description: 'Say: "There was something small I almost said the other day…" Share it briefly. No over-explaining.', category: 'action-with-partner' },
        { id: 'r11-120', duration_minutes: 120, title: 'A no-distraction hour', description: 'Put phones away and spend time together — talking, sitting, watching something. Focus on each other.', category: 'action-with-partner' },
      ]
    },
    // Day 12: Love
    {
      day_number: 12,
      fruit_theme: 'Love',
      tone: 'Encouraging',
      bible_reference: 'Song of Songs 8:7',
      bible_text: {
        NIV: 'Many waters cannot quench love; rivers cannot sweep it away. If one were to give all the wealth of one\'s house for love, it would be utterly scorned.',
        NLT: 'Many waters cannot quench love, neither can floods drown it. If a man offered for love all the wealth of his house, he would be utterly despised.',
        ESV: 'Many waters cannot quench love, neither can floods drown it. If a man offered for love all the wealth of his house, he would be utterly despised.',
        KJV: 'Many waters cannot quench love, neither can the floods drown it: if a man would give all the substance of his house for love, it would utterly be contemned.',
        NKJV: 'Many waters cannot quench love, nor can the floods drown it. If a man would give for love all the wealth of his house, it would be utterly despised.',
      },
      activities: [
        { id: 'r12-5', duration_minutes: 5, title: 'Pray', description: 'Pray that God reminds you both that what you have is worth fighting for. Ask for courage to keep showing up. Pray that love proves stronger than the distance between you right now.', category: 'self-reflection' },
        { id: 'r12-15', duration_minutes: 15, title: 'Send a message of value', description: 'Send a message: "There are things I really value about you, even when I don\'t say it."', category: 'action-with-partner' },
        { id: 'r12-30', duration_minutes: 30, title: 'Act on appreciation', description: 'Do one small thing that shows appreciation — help with something they usually handle, or make their day easier.', category: 'action-for-partner' },
        { id: 'r12-60', duration_minutes: 60, title: 'What do you still value', description: 'Ask: "What\'s one thing you still value about each other?" Keep answers simple and specific.', category: 'action-with-partner' },
        { id: 'r12-120', duration_minutes: 120, title: 'A slow meal together', description: 'Prepare or order food and eat together without rushing. If you have kids, stay at the table once things settle.', category: 'action-with-partner' },
      ]
    },
    // Day 13: Goodness
    {
      day_number: 13,
      fruit_theme: 'Goodness',
      tone: 'Gentle',
      bible_reference: 'Micah 6:8',
      bible_text: {
        NIV: 'He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God.',
        NLT: 'The Lord has told you what is good: to do what is right, to love mercy, and to walk humbly with your God.',
        ESV: 'He has told you, O man, what is good: and what does the Lord require of you but to do justice, and to love kindness, and to walk humbly with your God?',
        KJV: 'He hath shewed thee, O man, what is good; and what doth the Lord require of thee, but to do justly, and to love mercy, and to walk humbly with thy God?',
        NKJV: 'He has shown you, O man, what is good; and what does the Lord require of you but to do justly, to love mercy, and to walk humbly with your God?',
      },
      activities: [
        { id: 'r13-5', duration_minutes: 5, title: 'Pray', description: 'Pray for a merciful heart today — toward your spouse and toward yourself. Ask God to show you one place where humility could open something that has been closed.', category: 'self-reflection' },
        { id: 'r13-15', duration_minutes: 15, title: 'Say one kind sentence', description: 'At some point today, say simply: "I do appreciate you." Let it stand on its own.', category: 'action-with-partner' },
        { id: 'r13-30', duration_minutes: 30, title: 'Make their day easier', description: 'Take over one small task your spouse would normally handle. Let the action speak without explanation.', category: 'action-with-partner' },
        { id: 'r13-60', duration_minutes: 60, title: 'What daily kindness looks like', description: 'Ask: "What small things help you feel cared for day to day?" A couple of ideas each. Keep it practical.', category: 'action-with-partner' },
        { id: 'r13-120', duration_minutes: 120, title: 'Try a new recipe together', description: 'Choose something simple neither of you has made before and cook it together. Learn something side by side.', category: 'action-with-partner' },
      ]
    },
    // Day 14: Goodness
    {
      day_number: 14,
      fruit_theme: 'Goodness',
      tone: 'Encouraging',
      bible_reference: 'Hebrews 10:24',
      bible_text: {
        NIV: 'And let us consider how we may spur one another on toward love and good deeds.',
        NLT: 'Let us think of ways to motivate one another to acts of love and good works.',
        ESV: 'And let us consider how to stir up one another to love and good works.',
        KJV: 'And let us consider one another to provoke unto love and to good works:',
        NKJV: 'And let us consider one another in order to stir up love and good works.',
      },
      activities: [
        { id: 'r14-5', duration_minutes: 5, title: 'Journal', description: 'What is still good in your marriage that is worth holding onto? Write about what you want to protect and build on, even if other things feel uncertain right now.', category: 'self-reflection' },
        { id: 'r14-15', duration_minutes: 15, title: 'A small step toward openness', description: 'In a calm moment, say: "I\'d like for us to feel more open with each other. I want to do my part in that."', category: 'action-with-partner' },
        { id: 'r14-30', duration_minutes: 30, title: 'Remove a small barrier', description: 'Follow through on something you\'ve delayed or left unfinished that may be creating distance between you.', category: 'action-with-partner' },
        { id: 'r14-60', duration_minutes: 60, title: 'What helps you feel open', description: 'Ask: "What helps you feel comfortable being honest with me?" Listen without explaining your side.', category: 'action-with-partner' },
        { id: 'r14-120', duration_minutes: 120, title: 'An evening stroll somewhere new', description: 'Walk somewhere slightly different and take your time. A fresh shared experience with no pressure attached.', category: 'action-with-partner' },
      ]
    },
    // Day 15: Kindness
    {
      day_number: 15,
      fruit_theme: 'Kindness',
      tone: 'Gentle',
      bible_reference: '1 Peter 3:8',
      bible_text: {
        NIV: 'Finally, all of you, be like-minded, be sympathetic, love one another, be compassionate and humble.',
        NLT: 'Finally, all of you should be of one mind. Sympathize with each other. Love each other as brothers and sisters. Be tenderhearted, and keep a humble attitude.',
        ESV: 'Finally, all of you, have unity of mind, sympathy, brotherly love, a tender heart, and a humble mind.',
        KJV: 'Finally, be ye all of one mind, having compassion one of another, love as brethren, be pitiful, be courteous:',
        NKJV: 'Finally, all of you be of one mind, having compassion for one another; love as brothers, be tenderhearted, be courteous;',
      },
      activities: [
        { id: 'r15-5', duration_minutes: 5, title: 'Pray', description: 'Pray that God restores tenderness in you. Ask that your spouse feels cared for even in imperfect moments. Pray for grace to rebuild on truth rather than pretending things are fine.', category: 'self-reflection' },
        { id: 'r15-15', duration_minutes: 15, title: 'Say something humble', description: 'Say gently: "I know I don\'t always get this right, but I do care about us."', category: 'action-with-partner' },
        { id: 'r15-30', duration_minutes: 30, title: 'Show care despite how you feel', description: 'Do something kind for your spouse today regardless of your mood. Choose the action before the feeling follows.', category: 'action-for-partner' },
        { id: 'r15-60', duration_minutes: 60, title: 'What makes things feel harder', description: 'Ask: "What tends to make things feel more difficult between us?" One example each. No blame, no defence.', category: 'action-with-partner' },
        { id: 'r15-120', duration_minutes: 120, title: 'Visit a neutral place', description: 'Go to a café, park or bookstore together. Easy company in a calm setting with no expectations.', category: 'action-with-partner' },
      ]
    },
    // Day 16: Peace
    {
      day_number: 16,
      fruit_theme: 'Peace',
      tone: 'Encouraging',
      bible_reference: 'Matthew 5:9',
      bible_text: {
        NIV: 'Blessed are the peacemakers, for they will be called children of God.',
        NLT: 'God blesses those who work for peace, for they will be called the children of God.',
        ESV: 'Blessed are the peacemakers, for they shall be called sons of God.',
        KJV: 'Blessed are the peacemakers: for they shall be called the children of God.',
        NKJV: 'Blessed are the peacemakers, for they shall be called sons of God.',
      },
      activities: [
        { id: 'r16-5', duration_minutes: 5, title: 'Reflect', description: 'Where have you had the chance to bring peace into your marriage recently and taken it? Where have you missed it? What would one peacemaking choice look like today?', category: 'self-reflection' },
        { id: 'r16-15', duration_minutes: 15, title: 'Say one peaceful sentence', description: 'When things feel tense, say: "I don\'t want this to turn into something between us." Say it and let it land.', category: 'action-with-partner' },
        { id: 'r16-30', duration_minutes: 30, title: 'Do one thing that restores calm', description: 'Lower noise, reduce clutter, or create a calmer space in one small practical way.', category: 'action-with-partner' },
        { id: 'r16-60', duration_minutes: 60, title: 'What brings you peace with me', description: 'Ask: "What helps you feel peaceful with me?" Keep answers short and grounded in the everyday.', category: 'action-with-partner' },
        { id: 'r16-120', duration_minutes: 120, title: 'A music night', description: 'Play music you both enjoy or used to love and sit together. Let shared atmosphere do the work.', category: 'action-with-partner' },
      ]
    },
    // Day 17: Faithfulness
    {
      day_number: 17,
      fruit_theme: 'Faithfulness',
      tone: 'Gentle',
      bible_reference: 'Proverbs 20:6',
      bible_text: {
        NIV: 'Many claim to have unfailing love, but a faithful person who can find?',
        NLT: 'Many will say they are loyal friends, but who can find one who is truly reliable?',
        ESV: 'Many a man proclaims his own steadfast love, but a faithful man who can find?',
        KJV: 'Most men will proclaim every one his own goodness: but a faithful man who can find?',
        NKJV: 'Most men will proclaim each his own goodness, but who can find a faithful man?',
      },
      activities: [
        { id: 'r17-5', duration_minutes: 5, title: 'Journal', description: 'Faithfulness shows up in small things first. Write about one area where you could be more consistent toward your spouse this week. What would that look like in practice?', category: 'self-reflection' },
        { id: 'r17-15', duration_minutes: 15, title: 'Reinforce trust in words', description: 'Say something simple: "I want to be someone you can rely on."', category: 'action-with-partner' },
        { id: 'r17-30', duration_minutes: 30, title: 'Remove one source of doubt', description: 'Be consistent in one small action today so your spouse experiences your reliability rather than just hears about it.', category: 'action-for-partner' },
        { id: 'r17-60', duration_minutes: 60, title: 'What helps you feel secure', description: 'Ask: "What helps you feel safe and secure in our relationship?" Listen without reacting or defending.', category: 'action-with-partner' },
        { id: 'r17-120', duration_minutes: 120, title: 'Plan something to look forward to', description: 'Choose a simple future plan — a meal, an outing — and talk it through. Build a small sense of shared direction.', category: 'action-with-partner' },
      ]
    },
    // Day 18: Goodness
    {
      day_number: 18,
      fruit_theme: 'Goodness',
      tone: 'Gentle',
      bible_reference: 'Luke 6:31',
      bible_text: {
        NIV: 'Do to others as you would have them do to you.',
        NLT: 'Do to others as you would like them to do to you.',
        ESV: 'And as you wish that others would do to you, do so to them.',
        KJV: 'And as ye would that men should do to you, do ye also to them likewise.',
        NKJV: 'And just as you want men to do to you, you also do to them likewise.',
      },
      activities: [
        { id: 'r18-5', duration_minutes: 5, title: 'Pray', description: 'Pray that God helps you treat your spouse the way you want to be treated. Ask for grace to act with kindness even when it feels one-sided. Pray for growing trust between you.', category: 'self-reflection' },
        { id: 'r18-15', duration_minutes: 15, title: 'Match your tone to your values', description: 'In your next conversation, choose a response like "I understand" or "That makes sense" to keep things steady.', category: 'action-with-partner' },
        { id: 'r18-30', duration_minutes: 30, title: 'One fair and thoughtful act', description: 'Choose an action that shows fairness — share a task evenly or take your turn without being asked.', category: 'action-with-partner' },
        { id: 'r18-60', duration_minutes: 60, title: 'A moment we could revisit', description: 'Ask: "Was there a recent moment we could have handled more gently?" One example each, no blame attached.', category: 'action-with-partner' },
        { id: 'r18-120', duration_minutes: 120, title: 'A game or quiz night', description: 'Find a YouTube quiz — music, movies, trivia — and play along. The aim is to laugh and feel easy with each other.', category: 'action-with-partner' },
      ]
    },
    // Day 19: Kindness
    {
      day_number: 19,
      fruit_theme: 'Kindness',
      tone: 'Gentle',
      bible_reference: 'Ephesians 4:32',
      bible_text: {
        NIV: 'Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.',
        NLT: 'Instead, be kind to each other, tenderhearted, forgiving one another, just as God through Christ has forgiven you.',
        ESV: 'Be kind to one another, tenderhearted, forgiving one another, as God in Christ forgave you.',
        KJV: 'And be ye kind one to another, tenderhearted, forgiving one another, even as God for Christ\'s sake hath forgiven you.',
        NKJV: 'And be kind to one another, tenderhearted, forgiving one another, even as God in Christ forgave you.',
      },
      activities: [
        { id: 'r19-5', duration_minutes: 5, title: 'Pray', description: 'Pray that the forgiveness God has shown you becomes something you can extend today. Ask for a tender heart toward your spouse. Pray that kindness comes more easily between you.', category: 'self-reflection' },
        { id: 'r19-15', duration_minutes: 15, title: 'Acknowledge your tone', description: 'In a natural moment, say: "I\'ve noticed I\'ve been a bit short lately. I don\'t want that between us."', category: 'action-with-partner' },
        { id: 'r19-30', duration_minutes: 30, title: 'One kind act regardless', description: 'Choose one simple kind action today regardless of your mood. Let the action lead.', category: 'action-for-partner' },
        { id: 'r19-60', duration_minutes: 60, title: 'Something small to release', description: 'Ask gently: "Is there anything small we can let go of today?" Keep it light and contained.', category: 'action-with-partner' },
        { id: 'r19-120', duration_minutes: 120, title: 'Get takeaway, change location', description: 'Pick up takeaway and eat somewhere different — a park, outside. Shift the environment and keep things fresh.', category: 'action-with-partner' },
      ]
    },
    // Day 20: Love
    {
      day_number: 20,
      fruit_theme: 'Love',
      tone: 'Encouraging',
      bible_reference: '1 John 4:7',
      bible_text: {
        NIV: 'Dear friends, let us love one another, for love comes from God. Everyone who loves has been born of God and knows God.',
        NLT: 'Dear friends, let us continue to love one another, for love comes from God. Anyone who loves is a child of God and knows God.',
        ESV: 'Beloved, let us love one another, for love is from God, and whoever loves has been born of God and knows God.',
        KJV: 'Beloved, let us love one another: for love is of God; and every one that loveth is born of God, and knoweth God.',
        NKJV: 'Beloved, let us love one another, for love is of God; and everyone who loves is born of God and knows God.',
      },
      activities: [
        { id: 'r20-5', duration_minutes: 5, title: 'Journal', description: 'Love comes from God, which means you can ask Him for more of it. Write about where love feels thin right now and what it would look like to bring God into that specific place.', category: 'self-reflection' },
        { id: 'r20-15', duration_minutes: 15, title: 'Choose a loving phrase', description: 'Say something simple: "I do love you, even when things feel off between us."', category: 'action-with-partner' },
        { id: 'r20-30', duration_minutes: 30, title: 'One loving act', description: 'Do one small thing that clearly shows care — make something, help with something, do something thoughtful for them today.', category: 'action-with-partner' },
        { id: 'r20-60', duration_minutes: 60, title: 'What has been working', description: 'Ask: "What\'s one thing that has felt better between us lately?" One answer each. Stay focused on what is moving in the right direction.', category: 'action-with-partner' },
        { id: 'r20-120', duration_minutes: 120, title: 'Sit together and share space', description: 'Watch something or listen to music in the same room, no phones. No pressure for conversation. Just being in the same space counts.', category: 'action-with-partner' },
      ]
    },
    // Day 21: Patience
    {
      day_number: 21,
      fruit_theme: 'Patience',
      tone: 'Gentle',
      bible_reference: 'Proverbs 14:29',
      bible_text: {
        NIV: 'Whoever is patient has great understanding, but one who is quick-tempered displays folly.',
        NLT: 'People with understanding control their anger; a hot temper shows great foolishness.',
        ESV: 'Whoever is slow to anger has great understanding, but he who has a hasty temper exalts folly.',
        KJV: 'He that is slow to wrath is of great understanding: but he that is hasty of spirit exalteth folly.',
        NKJV: 'He who is slow to wrath has great understanding, but he who is impulsive exalts folly.',
      },
      activities: [
        { id: 'r21-5', duration_minutes: 5, title: 'Journal', description: 'Where does impatience show up most in your marriage? Write about what is usually underneath it — and what one steadier response could look like this week.', category: 'self-reflection' },
        { id: 'r21-15', duration_minutes: 15, title: 'Say something calming', description: 'Say gently: "We\'ll be okay. I\'d like us to work through things calmly."', category: 'action-with-partner' },
        { id: 'r21-30', duration_minutes: 30, title: 'Do one thing that creates calm', description: 'Handle one situation today in a slower, calmer way than you normally would.', category: 'action-with-partner' },
        { id: 'r21-60', duration_minutes: 60, title: 'What has felt frustrating lately', description: 'Ask: "What\'s one thing that\'s been frustrating for you lately?" One answer each. Listen without fixing.', category: 'action-with-partner' },
        { id: 'r21-120', duration_minutes: 120, title: 'A calming activity together', description: 'Make tea, sit outside or listen to music side by side. Create a peaceful shared rhythm with no agenda.', category: 'action-with-partner' },
      ]
    },
    // Day 22: Unity
    {
      day_number: 22,
      fruit_theme: 'Unity',
      tone: 'Gentle',
      bible_reference: 'Genesis 2:24',
      bible_text: {
        NIV: 'That is why a man leaves his father and mother and is united to his wife, and they become one flesh.',
        NLT: 'This explains why a man leaves his father and mother and is joined to his wife, and the two are united into one.',
        ESV: 'Therefore a man shall leave his father and his mother and hold fast to his wife, and they shall become one flesh.',
        KJV: 'Therefore shall a man leave his father and his mother, and shall cleave unto his wife: and they shall be one flesh.',
        NKJV: 'Therefore a man shall leave his father and mother and be joined to his wife, and they shall become one flesh.',
      },
      activities: [
        { id: 'r22-5', duration_minutes: 5, title: 'Pray', description: 'Pray over the covenant you made. Ask God to remind you both what you are to each other. Pray that the bond between you grows stronger than the distance that has formed.', category: 'self-reflection' },
        { id: 'r22-15', duration_minutes: 15, title: 'Reconnect with something familiar', description: 'Say: "I was thinking about when we first got together — I really valued that time with you."', category: 'action-with-partner' },
        { id: 'r22-30', duration_minutes: 30, title: 'Recreate a small moment', description: 'Do something simple you used to do earlier in your relationship — make a drink, start a small routine, sit in a familiar spot.', category: 'action-with-partner' },
        { id: 'r22-60', duration_minutes: 60, title: 'One early memory', description: 'Ask: "What\'s one memory from early on that stands out to you?" Stay in it and enjoy it together.', category: 'action-with-partner' },
        { id: 'r22-120', duration_minutes: 120, title: 'Revisit a familiar favourite', description: 'Return to a place or activity you both know. Reconnect through something that already belongs to you both.', category: 'action-with-partner' },
      ]
    },
    // Day 23: Peace
    {
      day_number: 23,
      fruit_theme: 'Peace',
      tone: 'Encouraging',
      bible_reference: 'Ecclesiastes 4:9–10',
      bible_text: {
        NIV: 'Two are better than one, because they have a good return for their labor. If either of them falls down, one can help the other up.',
        NLT: 'Two people are better off than one, for they can help each other succeed. If one person falls, the other can reach out and help.',
        ESV: 'Two are better than one, because they have a good reward for their toil. For if they fall, one will lift up his fellow.',
        KJV: 'Two are better than one; because they have a good reward for their labour. For if they fall, the one will lift up his fellow.',
        NKJV: 'Two are better than one, because they have a good reward for their labor. For if they fall, one will lift up his companion.',
      },
      activities: [
        { id: 'r23-5', duration_minutes: 5, title: 'Journal', description: 'Where has your spouse needed support lately and you have given it? Where have you held back? Write about what showing up for each other looks like in this season.', category: 'self-reflection' },
        { id: 'r23-15', duration_minutes: 15, title: 'Offer help directly', description: 'Say: "What\'s one thing I could help you with today?" Leave it open and mean it.', category: 'action-with-partner' },
        { id: 'r23-30', duration_minutes: 30, title: 'Lighten their load', description: 'Take over one responsibility your spouse is carrying so they feel the practical difference of having you on their side.', category: 'action-with-partner' },
        { id: 'r23-60', duration_minutes: 60, title: 'What would feel like real support?', description: 'Ask: "What\'s one thing that would make you feel genuinely supported by me right now?" Listen without pushing back or offering a different answer.', category: 'action-with-partner' },
        { id: 'r23-120', duration_minutes: 120, title: 'Turn errands into shared time', description: 'Run errands together and include a small treat or pause along the way. Bring connection into the ordinary.', category: 'action-with-partner' },
      ]
    },
    // Day 24: Faithfulness
    {
      day_number: 24,
      fruit_theme: 'Faithfulness',
      tone: 'Gentle',
      bible_reference: 'Proverbs 27:17',
      bible_text: {
        NIV: 'As iron sharpens iron, so one person sharpens another.',
        NLT: 'As iron sharpens iron, so a friend sharpens a friend.',
        ESV: 'Iron sharpens iron, and one man sharpens another.',
        KJV: 'Iron sharpeneth iron; so a man sharpeneth the countenance of his friend.',
        NKJV: 'As iron sharpens iron, so a man sharpens the countenance of his friend.',
      },
      activities: [
        { id: 'r24-5', duration_minutes: 5, title: 'Pray', description: 'Pray that God builds faithfulness and openness in you. Ask that your spouse feels secure enough to be honest with you. Pray for a marriage where both of you make each other better.', category: 'self-reflection' },
        { id: 'r24-15', duration_minutes: 15, title: 'Invite openness gently', description: 'Say: "If something\'s been sitting with you, I\'m open to hearing it."', category: 'action-with-partner' },
        { id: 'r24-30', duration_minutes: 30, title: 'Respond with openness in action', description: 'Do one small action that shows flexibility — follow through, adjust something, be more willing than usual.', category: 'action-with-partner' },
        { id: 'r24-60', duration_minutes: 60, title: 'One thing we could do better', description: 'Ask: "What\'s one small thing we could do better as a couple?" Stay focused on solutions, not history.', category: 'action-with-partner' },
        { id: 'r24-120', duration_minutes: 120, title: 'A simple at-home evening', description: 'Set up snacks or drinks and spend the evening together without a plan. If you have kids, this works well after bedtime.', category: 'action-with-partner' },
      ]
    },
    // Day 25: Love
    {
      day_number: 25,
      fruit_theme: 'Love',
      tone: 'Encouraging',
      bible_reference: 'Colossians 3:14',
      bible_text: {
        NIV: 'And over all these virtues put on love, which binds them all together in perfect unity.',
        NLT: 'Above all, clothe yourselves with love, which binds us all together in perfect harmony.',
        ESV: 'And above all these put on love, which binds everything together in perfect harmony.',
        KJV: 'And above all these things put on charity, which is the bond of perfectness.',
        NKJV: 'But above all these things put on love, which is the bond of perfection.',
      },
      activities: [
        { id: 'r25-5', duration_minutes: 5, title: 'Reflect', description: 'Love is described here as something you put on — a daily choice, not just a feeling. Where have you chosen it recently? Where have you avoided it? What would choosing it look like today?', category: 'self-reflection' },
        { id: 'r25-15', duration_minutes: 15, title: 'Say something to release tension', description: 'Say: "I don\'t want us holding onto small things. I\'d rather keep things light between us where we can."', category: 'action-with-partner' },
        { id: 'r25-30', duration_minutes: 30, title: 'Show love through a small act', description: 'Do one small practical thing that shows care and kindness toward your spouse today.', category: 'action-with-partner' },
        { id: 'r25-60', duration_minutes: 60, title: 'Something small to release', description: 'Ask gently: "Is there something small we can let go of today?" Keep it simple and contained.', category: 'action-with-partner' },
        { id: 'r25-120', duration_minutes: 120, title: 'Reset the mood together', description: 'Step outside, change rooms, or shift the setting. Begin the evening again with a lighter tone.', category: 'action-with-partner' },
      ]
    },
    // Day 26: Self-control
    {
      day_number: 26,
      fruit_theme: 'Self-control',
      tone: 'Gentle',
      bible_reference: 'Proverbs 18:13',
      bible_text: {
        NIV: 'To answer before listening—that is folly and shame.',
        NLT: 'Spouting off before listening to the facts is both shameful and foolish.',
        ESV: 'If one gives an answer before he hears, it is his folly and shame.',
        KJV: 'He that answereth a matter before he heareth it, it is folly and shame unto him.',
        NKJV: 'He who answers a matter before he hears it, it is folly and shame to him.',
      },
      activities: [
        { id: 'r26-5', duration_minutes: 5, title: 'Journal', description: 'Think about the last conversation with your spouse where you responded before they had finished. What were you actually reacting to? What would full listening have changed?', category: 'self-reflection' },
        { id: 'r26-15', duration_minutes: 15, title: 'Show you are listening', description: 'Say: "I do want to understand you better. I\'m listening."', category: 'action-with-partner' },
        { id: 'r26-30', duration_minutes: 30, title: 'Listen through action', description: 'Put your phone away when your spouse is speaking today. Full attention is its own kind of respect.', category: 'action-with-partner' },
        { id: 'r26-60', duration_minutes: 60, title: 'Give them the floor', description: 'Ask: "Is there something you\'d like me to hear more clearly?" Let them speak fully before you respond.', category: 'action-with-partner' },
        { id: 'r26-120', duration_minutes: 120, title: 'Chat then settle into something', description: 'Spend time talking about something light, then move into a show or activity together. Balance conversation with ease.', category: 'action-with-partner' },
      ]
    },
    // Day 27: Faithfulness
    {
      day_number: 27,
      fruit_theme: 'Faithfulness',
      tone: 'Encouraging',
      bible_reference: 'Proverbs 3:5–6',
      bible_text: {
        NIV: 'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.',
        NLT: 'Trust in the Lord with all your heart; do not depend on your own understanding. Seek his will in all you do, and he will show you which path to take.',
        ESV: 'Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths.',
        KJV: 'Trust in the Lord with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.',
        NKJV: 'Trust in the Lord with all your heart, and lean not on your own understanding; in all your ways acknowledge Him, and He shall direct your paths.',
      },
      activities: [
        { id: 'r27-5', duration_minutes: 5, title: 'Pray', description: 'Pray that God directs your marriage where your own understanding has run out. Ask for the humility to trust Him with what you cannot fix. Pray for small signs of His faithfulness today.', category: 'self-reflection' },
        { id: 'r27-15', duration_minutes: 15, title: 'Acknowledge growth', description: 'Say: "I\'m trying to do things differently, even in small ways. I want you to know that."', category: 'action-with-partner' },
        { id: 'r27-30', duration_minutes: 30, title: 'One visible change', description: 'Choose one small behaviour to change today and act on it. Let the change speak for itself.', category: 'self-reflection' },
        { id: 'r27-60', duration_minutes: 60, title: 'One habit to grow toward', description: 'Ask: "What\'s one small thing we\'d each like to move toward as a couple?" One answer each, forward-facing.', category: 'action-with-partner' },
        { id: 'r27-120', duration_minutes: 120, title: 'Easy conversation tonight', description: 'Choose topics like travel, food or "what would we do if" and keep it playful. Let the evening feel light.', category: 'action-with-partner' },
      ]
    },
    // Day 28: Peace
    {
      day_number: 28,
      fruit_theme: 'Peace',
      tone: 'Encouraging',
      bible_reference: 'Romans 15:5',
      bible_text: {
        NIV: 'May the God who gives endurance and encouragement give you the same attitude of mind toward each other that Christ Jesus had.',
        NLT: 'May God, who gives this patience and encouragement, help you live in complete harmony with each other, as is fitting for followers of Christ Jesus.',
        ESV: 'May the God of endurance and encouragement grant you to live in such harmony with one another, in accord with Christ Jesus.',
        KJV: 'Now the God of patience and consolation grant you to be likeminded one toward another according to Christ Jesus.',
        NKJV: 'Now may the God of patience and comfort grant you to be like-minded toward one another, according to Christ Jesus.',
      },
      activities: [
        { id: 'r28-5', duration_minutes: 5, title: 'Pray', description: 'Pray this verse over your marriage today. Ask God for the endurance to keep going and the encouragement to believe things can change. Pray for harmony that comes from Him, not just effort.', category: 'self-reflection' },
        { id: 'r28-15', duration_minutes: 15, title: 'Put them first in words', description: 'Say: "I want to be more aware of what you need. I\'m working on that."', category: 'action-with-partner' },
        { id: 'r28-30', duration_minutes: 30, title: 'Support them visibly', description: 'Do something today that clearly shows your spouse they matter — especially in something that is important to them.', category: 'action-with-partner' },
        { id: 'r28-60', duration_minutes: 60, title: 'How can I support you better', description: 'Ask: "What\'s one way I could support you better right now?" Receive the answer openly without defending.', category: 'action-with-partner' },
        { id: 'r28-120', duration_minutes: 120, title: 'Try something slightly new', description: 'Visit a new café, try a new snack, or explore somewhere unfamiliar. A small dose of novelty and shared discovery.', category: 'action-with-partner' },
      ]
    },
    // Day 29: Peace
    {
      day_number: 29,
      fruit_theme: 'Peace',
      tone: 'Encouraging',
      bible_reference: '2 Corinthians 13:11',
      bible_text: {
        NIV: 'Aim for restoration, comfort one another, agree with one another, live in peace.',
        NLT: 'Aim for harmony, comfort each other, and live in peace.',
        ESV: 'Aim for restoration, comfort one another, agree with one another, live in peace.',
        KJV: 'Be perfect, be of good comfort, be of one mind, live in peace.',
        NKJV: 'Become complete. Be of good comfort, be of one mind, live in peace.',
      },
      activities: [
        { id: 'r29-5', duration_minutes: 5, title: 'Pray', description: 'Pray for restoration in your marriage — not perfection, but movement toward each other. Ask God to bring comfort where there has been hurt. Pray that peace becomes the atmosphere between you.', category: 'self-reflection' },
        { id: 'r29-15', duration_minutes: 15, title: 'Say something that brings peace', description: 'Say gently: "I\'d really like things to feel easier between us. I believe they can."', category: 'action-with-partner' },
        { id: 'r29-30', duration_minutes: 30, title: 'One comforting act', description: 'Do one small thing that brings comfort — make a drink, help with something they are handling, ease one thing for them.', category: 'action-with-partner' },
        { id: 'r29-60', duration_minutes: 60, title: 'What brings peace between us', description: 'Ask: "What helps you feel at peace in our relationship?" One or two answers each. Receive them well.', category: 'action-with-partner' },
        { id: 'r29-120', duration_minutes: 120, title: 'Wind down together', description: 'Spend the last part of the evening in the same space with low energy and easy conversation. End the day feeling settled.', category: 'action-with-partner' },
      ]
    },
    // Day 30: Peace
    {
      day_number: 30,
      fruit_theme: 'Peace',
      tone: 'Gentle',
      bible_reference: 'Psalm 147:3',
      bible_text: {
        NIV: 'He heals the brokenhearted and binds up their wounds.',
        NLT: 'He heals the brokenhearted and bandages their wounds.',
        ESV: 'He heals the brokenhearted and binds up their wounds.',
        KJV: 'He healeth the broken in heart, and bindeth up their wounds.',
        NKJV: 'He heals the brokenhearted and binds up their wounds.',
      },
      activities: [
        { id: 'r30-5', duration_minutes: 5, title: 'Pray', description: 'Pray that God does what only He can do in your marriage. Thank Him for the ground you have covered. Ask Him to continue the healing — in you, in your spouse, and between you both.', category: 'self-reflection' },
        { id: 'r30-15', duration_minutes: 15, title: 'Speak hope over your marriage', description: 'Say: "I\'m glad we are still here. I believe God is working in this."', category: 'action-with-partner' },
        { id: 'r30-30', duration_minutes: 30, title: 'Show repair through action', description: 'Do one practical thing that shows you care and want things to be better — follow through, ease something, show up well.', category: 'action-with-partner' },
        { id: 'r30-60', duration_minutes: 60, title: 'A simple shared acknowledgement', description: 'Say to each other: "One thing I have appreciated about you over these days is…" Keep it genuine and brief.', category: 'action-with-partner' },
        { id: 'r30-120', duration_minutes: 120, title: 'End with something calm', description: 'Spend the final part of the evening in the same space, unhurried. Let the day close with a sense of peace and arrival.', category: 'action-with-partner' },
      ]
    },
  ]
,
  family: [
    // Day 1: Love
    {
      day_number: 1,
      fruit_theme: 'Love',
      tone: 'Encouraging',
      bible_reference: 'Proverbs 17:17',
      bible_text: {
        NIV: 'A friend loves at all times, and a brother is born for a time of adversity.',
        ESV: 'A friend loves at all times, and a brother is born for adversity.',
        KJV: 'A friend loveth at all times, and a brother is born for adversity.',
        NLT: 'A friend is always loyal, and a brother is born to help in time of need.',
        NKJV: 'A friend loves at all times, and a brother is born for adversity.',
      },
      activities: [
        { id: 'f1-5', duration_minutes: 5, title: 'Family Hug', description: 'Gather everyone for a 5-minute focused group hug and prayer.', category: 'action-with-partner' },
        { id: 'f1-15', duration_minutes: 15, title: 'Highs & Lows', description: 'Share the best and hardest part of everyone\'s day.', category: 'action-with-partner' },
        { id: 'f1-30', duration_minutes: 30, title: 'Secret Blessing', description: 'Each family member does a chore for another in secret.', category: 'action-for-partner' },
        { id: 'f1-60', duration_minutes: 60, title: 'Family Game', description: 'Play a collaborative game that requires teamwork.', category: 'action-with-partner' },
        { id: 'f1-120', duration_minutes: 120, title: 'Family Legacy', description: 'Start a family scrapbook or box of shared blessings.', category: 'action-with-partner' },
      ]
    },
    // Day 2: Joy
    {
      day_number: 2,
      fruit_theme: 'Joy',
      tone: 'Encouraging',
      bible_reference: 'Nehemiah 8:10',
      bible_text: {
        NIV: 'The joy of the Lord is your strength.',
        ESV: 'The joy of the Lord is your strength.',
        KJV: 'The joy of the Lord is your strength.',
        NLT: 'The joy of the Lord is your strength!',
        NKJV: 'The joy of the Lord is your strength.',
      },
      activities: [
        { id: 'f2-5', duration_minutes: 5, title: 'Joy Moment', description: 'Everyone shares one thing that made them smile today.', category: 'action-with-partner' },
        { id: 'f2-15', duration_minutes: 15, title: 'Laughter Time', description: 'Watch something funny or tell jokes together.', category: 'action-with-partner' },
        { id: 'f2-30', duration_minutes: 30, title: 'Silly Fun', description: 'Do something playful and silly as a family.', category: 'action-with-partner' },
        { id: 'f2-60', duration_minutes: 60, title: 'Happy Outing', description: 'Go somewhere together that brings everyone joy.', category: 'action-with-partner' },
        { id: 'f2-120', duration_minutes: 120, title: 'Celebration', description: 'Celebrate a family achievement or milestone.', category: 'action-with-partner' },
      ]
    },
    // Day 3: Peace
    {
      day_number: 3,
      fruit_theme: 'Peace',
      tone: 'Gentle',
      bible_reference: 'Psalm 133:1',
      bible_text: {
        NIV: 'How good and pleasant it is when brothers live together in unity!',
        ESV: 'Behold, how good and pleasant it is when brothers dwell in unity!',
        KJV: 'Behold, how good and how pleasant it is for brethren to dwell together in unity!',
        NLT: 'How wonderful and pleasant it is when brothers live together in harmony!',
        NKJV: 'Behold, how good and how pleasant it is for brethren to dwell together in unity!',
      },
      activities: [
        { id: 'f3-5', duration_minutes: 5, title: 'Quiet Time', description: 'Sit quietly together as a family without phones or screens.', category: 'action-with-partner' },
        { id: 'f3-15', duration_minutes: 15, title: 'Peace Activity', description: 'Do a calming activity together like coloring or listening to music.', category: 'action-with-partner' },
        { id: 'f3-30', duration_minutes: 30, title: 'Resolve Conflict', description: 'If there\'s been tension, talk it out peacefully together.', category: 'action-with-partner' },
        { id: 'f3-60', duration_minutes: 60, title: 'Peaceful Walk', description: 'Take a family walk in nature together.', category: 'action-with-partner' },
        { id: 'f3-120', duration_minutes: 120, title: 'Family Meditation', description: 'Do a guided relaxation or meditation as a family.', category: 'action-with-partner' },
      ]
    },
    // Day 4: Patience
    {
      day_number: 4,
      fruit_theme: 'Patience',
      tone: 'Encouraging',
      bible_reference: 'Proverbs 15:18',
      bible_text: {
        NIV: 'A hot-tempered person stirs up conflict, but the patient person calms a quarrel.',
        ESV: 'A hot-tempered man stirs up strife, but he who is slow to anger quiets contention.',
        KJV: 'A wrathful man stirreth up strife: but he that is slow to anger appeaseth strife.',
        NLT: 'A hot-tempered person starts fights; a cool-tempered person stops them.',
        NKJV: 'A wrathful man stirs up strife, but he who is slow to anger allays contention.',
      },
      activities: [
        { id: 'f4-5', duration_minutes: 5, title: 'Pause Practice', description: 'When frustrated, pause and breathe before reacting.', category: 'self-reflection' },
        { id: 'f4-15', duration_minutes: 15, title: 'Patient Listening', description: 'Each family member shares while others listen without interrupting.', category: 'action-with-partner' },
        { id: 'f4-30', duration_minutes: 30, title: 'Help Each Other', description: 'Work together on something that requires teamwork and patience.', category: 'action-with-partner' },
        { id: 'f4-60', duration_minutes: 60, title: 'Teaching Time', description: 'An older family member teaches a younger one a skill.', category: 'action-with-partner' },
        { id: 'f4-120', duration_minutes: 120, title: 'Growth Talk', description: 'Discuss how patience helps your family grow stronger.', category: 'action-with-partner' },
      ]
    },
    // Day 5: Kindness
    {
      day_number: 5,
      fruit_theme: 'Kindness',
      tone: 'Encouraging',
      bible_reference: '1 Thessalonians 5:15',
      bible_text: {
        NIV: 'Make sure that nobody pays back wrong for wrong, but always strive to do what is good for each other and for everyone else.',
        ESV: 'See that no one repays anyone evil for evil, but always seek to do good to one another and to everyone.',
        KJV: 'See that none render evil for evil unto any man; but ever follow that which is good, both among yourselves, and to all men.',
        NLT: 'See that no one pays back evil for evil, but always try to be kind to each other and to all people.',
        NKJV: 'See that no one renders evil for evil to anyone, but always pursue what is good both for yourselves and for all.',
      },
      activities: [
        { id: 'f5-5', duration_minutes: 5, title: 'Kind Words', description: 'Say something kind to each family member.', category: 'action-for-partner' },
        { id: 'f5-15', duration_minutes: 15, title: 'Compliment Circle', description: 'Go around and compliment each other.', category: 'action-with-partner' },
        { id: 'f5-30', duration_minutes: 30, title: 'Acts of Service', description: 'Each person does something kind for another family member.', category: 'action-for-partner' },
        { id: 'f5-60', duration_minutes: 60, title: 'Care Time', description: 'Focus on caring for and supporting each other.', category: 'action-with-partner' },
        { id: 'f5-120', duration_minutes: 120, title: 'Kindness Project', description: 'Plan a family kindness project for your community.', category: 'action-with-partner' },
      ]
    },
    // Day 6: Goodness
    {
      day_number: 6,
      fruit_theme: 'Goodness',
      tone: 'Encouraging',
      bible_reference: '3 John 1:11',
      bible_text: {
        NIV: 'Dear friend, do not imitate what is evil but what is good. Anyone who does what is good is from God; anyone who does what is evil has not seen God.',
        ESV: 'Beloved, do not imitate evil but imitate good. Whoever does good is from God; whoever does evil has not seen God.',
        KJV: 'Beloved, follow not that which is evil, but that which is good. He that doeth good is of God: but he that doeth evil hath not seen God.',
        NLT: 'Dear friend, don\'t let this bad example influence you. Follow what is good. Remember that those who do good prove they are children of God, but those who do evil prove they do not know God.',
        NKJV: 'Beloved, do not imitate what is evil, but what is good. He who does good is of God, but he who does evil has not seen God.',
      },
      activities: [
        { id: 'f6-5', duration_minutes: 5, title: 'Choose Good', description: 'Make one choice that reflects goodness toward your family.', category: 'self-reflection' },
        { id: 'f6-15', duration_minutes: 15, title: 'Good Behavior', description: 'Discuss what "goodness" means in your family.', category: 'action-with-partner' },
        { id: 'f6-30', duration_minutes: 30, title: 'Help Others', description: 'Do something good for someone outside your family.', category: 'action-with-partner' },
        { id: 'f6-60', duration_minutes: 60, title: 'Community Service', description: 'Volunteer together as a family.', category: 'action-with-partner' },
        { id: 'f6-120', duration_minutes: 120, title: 'Legacy Building', description: 'Discuss the kind of family legacy of goodness you want to create.', category: 'action-with-partner' },
      ]
    },
    // Day 7: Faithfulness
    {
      day_number: 7,
      fruit_theme: 'Faithfulness',
      tone: 'Encouraging',
      bible_reference: 'Proverbs 20:28',
      bible_text: {
        NIV: 'Love and faithfulness keep a king safe; through love his throne is made secure.',
        ESV: 'Steadfast love and faithfulness preserve the king, and his throne is upheld by steadfast love.',
        KJV: 'Mercy and truth preserve the king: and his throne is upholden by mercy.',
        NLT: 'Unfailing love and faithfulness make atonement for sin. By fearing the Lord, people avoid evil.',
        NKJV: 'Mercy and truth preserve the king, and he upholds his throne by mercy.',
      },
      activities: [
        { id: 'f7-5', duration_minutes: 5, title: 'Keep Promise', description: 'Keep a promise you made to your family.', category: 'self-reflection' },
        { id: 'f7-15', duration_minutes: 15, title: 'Family Tradition', description: 'Start or honor a family tradition that shows commitment.', category: 'action-with-partner' },
        { id: 'f7-30', duration_minutes: 30, title: 'Be Dependable', description: 'Show your family they can count on you.', category: 'action-with-partner' },
        { id: 'f7-60', duration_minutes: 60, title: 'Trust Talk', description: 'Discuss how faithfulness strengthens your family bond.', category: 'action-with-partner' },
        { id: 'f7-120', duration_minutes: 120, title: 'Family Commitment', description: 'Reaffirm your commitment to your family and each other.', category: 'action-with-partner' },
      ]
    },
    // Day 8: Gentleness
    {
      day_number: 8,
      fruit_theme: 'Gentleness',
      tone: 'Gentle',
      bible_reference: 'Proverbs 15:1',
      bible_text: {
        NIV: 'A gentle answer turns away wrath, but a harsh word stirs up anger.',
        ESV: 'A soft answer turns away wrath, but a harsh word stirs up anger.',
        KJV: 'A soft answer turneth away wrath: but grievous words stir up anger.',
        NLT: 'A soft answer deflects anger, but harsh words make tempers hot.',
        NKJV: 'A soft answer turns away wrath, but a harsh word stirs up anger.',
      },
      activities: [
        { id: 'f8-5', duration_minutes: 5, title: 'Soft Touch', description: 'Give each family member a gentle hug or touch.', category: 'action-with-partner' },
        { id: 'f8-15', duration_minutes: 15, title: 'Gentle Words', description: 'Speak only with gentleness to each other.', category: 'action-with-partner' },
        { id: 'f8-30', duration_minutes: 30, title: 'Comfort Someone', description: 'Offer comfort and care to a family member who\'s struggling.', category: 'action-with-partner' },
        { id: 'f8-60', duration_minutes: 60, title: 'Tender Moments', description: 'Share quiet, gentle time together as a family.', category: 'action-with-partner' },
        { id: 'f8-120', duration_minutes: 120, title: 'Vulnerability', description: 'Share your hearts gently with each other.', category: 'action-with-partner' },
      ]
    },
    // Day 9: Self-Control
    {
      day_number: 9,
      fruit_theme: 'Self-Control',
      tone: 'Challenging',
      bible_reference: 'Proverbs 14:29',
      bible_text: {
        NIV: 'The one who is patient is calm and even-tempered, but the quick-tempered person acts foolishly.',
        ESV: 'Whoever is slow to anger has great understanding, but he who has a hasty temper exalts folly.',
        KJV: 'He that is slow to wrath is of great understanding: but he that is hasty of spirit exalteth folly.',
        NLT: 'People with understanding control their anger; a hot temper shows great foolishness.',
        NKJV: 'He who is slow to wrath has great understanding, but he who is quick-tempered exalts folly.',
      },
      activities: [
        { id: 'f9-5', duration_minutes: 5, title: 'Control Impulse', description: 'When upset, pause before reacting.', category: 'self-reflection' },
        { id: 'f9-15', duration_minutes: 15, title: 'Calm Response', description: 'Practice responding calmly to family tensions.', category: 'self-reflection' },
        { id: 'f9-30', duration_minutes: 30, title: 'No Blame Game', description: 'Address conflict without blaming or attacking.', category: 'action-with-partner' },
        { id: 'f9-60', duration_minutes: 60, title: 'Discipline Talk', description: 'Discuss healthy self-control as a family value.', category: 'action-with-partner' },
        { id: 'f9-120', duration_minutes: 120, title: 'Growth Together', description: 'Reflect on how self-control improves your family.', category: 'action-with-partner' },
      ]
    },
    // Day 10: Love (repeating cycle)
    {
      day_number: 10,
      fruit_theme: 'Love',
      tone: 'Encouraging',
      bible_reference: '1 Peter 4:8',
      bible_text: {
        NIV: 'Above all, love each other deeply, because love covers a multitude of sins.',
        ESV: 'Above all, keep loving one another earnestly, since love covers a multitude of sins.',
        KJV: 'And above all things have fervent charity among yourselves: for charity shall cover the multitude of sins.',
        NLT: 'Most importantly, love each other deeply, because love covers a multitude of sins.',
        NKJV: 'And above all things have fervent love for one another, for "love will cover a multitude of sins."',
      },
      activities: [
        { id: 'f10-5', duration_minutes: 5, title: 'Love Declaration', description: 'Tell each family member why you love them.', category: 'action-with-partner' },
        { id: 'f10-15', duration_minutes: 15, title: 'Love Talk', description: 'Share about the different ways you love each other.', category: 'action-with-partner' },
        { id: 'f10-30', duration_minutes: 30, title: 'Show Love', description: 'Do something that shows your family how much you love them.', category: 'action-for-partner' },
        { id: 'f10-60', duration_minutes: 60, title: 'Family Bond', description: 'Spend quality time strengthening your family bond.', category: 'action-with-partner' },
        { id: 'f10-120', duration_minutes: 120, title: 'Love Legacy', description: 'Reflect on your family legacy of love and commitment.', category: 'action-with-partner' },
      ]
    },
  ]
};
