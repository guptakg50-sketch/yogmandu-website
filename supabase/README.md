# Yogmandu Supabase Setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the Supabase SQL editor.
3. Create a public Storage bucket named `yogmandu-media`.
4. Add these variables to `.env.local`:

```bash
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_STORAGE_BUCKET=yogmandu-media
ADMIN_PASSWORD=choose-a-long-random-password
ADMIN_SESSION_SECRET=choose-another-long-random-string
```

5. Restart `npm run dev`.

The admin panel uses server-side Next route handlers:

- `GET/PUT /api/admin/blogs`
- `GET/PUT /api/admin/sessions`
- `GET/PUT /api/admin/media`
- `POST /api/admin/media/upload`

The service role key stays on the server. Do not expose it with a
`NEXT_PUBLIC_` prefix.

The admin APIs require an HTTP-only signed session cookie. Set
`ADMIN_PASSWORD` before connecting Supabase; without it, the admin UI falls
back to browser-local draft data and the remote CMS APIs return `503`.
