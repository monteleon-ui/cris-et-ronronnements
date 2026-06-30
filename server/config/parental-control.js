// Configuration du contrôle parental
module.exports = {
    enabled: true,
    minAge: 18,
    cookieName: 'ageVerified',
    cookieMaxAge: 30,
    protectedRoutes: [
        '/bfk',          // ✅ Sans / final
        '/bfk/questionnaire',
        '/bfk/information',
        '/iufmm',
        '/sv_edition',
        '/reveries'
    ],
    excludedRoutes: [
        '/controle-parental',
        '/',
        '/index',
        '/assets/',
        '/legal/',
        '/api/'
    ],
    cookieOptions: {
    httpOnly: true,
    sameSite: 'lax',
    secure: true
}
};