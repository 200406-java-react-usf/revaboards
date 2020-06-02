package com.revature.revaboards.repositories;

import com.revature.revaboards.entities.AppUser;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserRepository implements CrudRepository<AppUser> {

    private SessionFactory sessionFactory;

    @Autowired
    public UserRepository(SessionFactory factory) {
        this.sessionFactory = factory;
    }

    @Override
    public List<AppUser> getAll() {
        Session session = sessionFactory.getCurrentSession();
        return session.createQuery("from AppUser", AppUser.class).getResultList();
    }

    @Override
    public AppUser findById(int id) {
        Session session = sessionFactory.getCurrentSession();
        return session.get(AppUser.class, id);
    }

    @Override
    public AppUser save(AppUser newObj) {
        return null;
    }

    @Override
    public boolean update(AppUser updatedObj) {
        return false;
    }

    @Override
    public boolean deleteById(int id) {
        return false;
    }

}
