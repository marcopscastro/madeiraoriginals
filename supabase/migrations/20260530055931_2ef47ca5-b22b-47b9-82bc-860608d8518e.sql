
-- 1) Reviews: prevent self-approval. Default new reviews to unapproved.
ALTER TABLE public.reviews ALTER COLUMN approved SET DEFAULT false;

DROP POLICY IF EXISTS "Users update own review" ON public.reviews;
CREATE POLICY "Users update own review"
ON public.reviews
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id AND approved = false);

DROP POLICY IF EXISTS "Authed users insert own review" ON public.reviews;
CREATE POLICY "Authed users insert own review"
ON public.reviews
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id AND approved = false);

-- 2) Quote artwork: remove unrestricted public upload policy (no frontend uses it).
DROP POLICY IF EXISTS "Anyone can upload quote artwork" ON storage.objects;

-- 3) user_roles: make write-deny explicit by revoking privileges from anon/authenticated.
REVOKE INSERT, UPDATE, DELETE ON public.user_roles FROM anon, authenticated;
